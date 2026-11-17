let stationsList = [];

// to fetch station metadata and populate the search datalist
window.addEventListener('load', function() {
  fetch('https://rata.digitraffic.fi/api/v1/metadata/stations')
    .then(response => response.json())
    .then(data => {
      // Filter to keep only passenger-serving stations as it seems like it is needed for this app
      stationsList = data.filter(station => station.passengerTraffic);

      // Populate HTML <datalist> with clean station names and short codes
      const datalist = document.getElementById('stations-datalist');
      stationsList.forEach(station => {
        const cleanName = station.stationName.replace(/\s+asema$/i, '');
        const option = document.createElement('option');
        option.value = `${cleanName} (${station.stationShortCode})`;
        datalist.appendChild(option);
      });
    });
});

// Listen for user input in the search box
document.getElementById('station-search').addEventListener('input', function(event) {
  const userInput = event.target.value.trim();

  // Find the station matching the user's input
  const matchedStation = stationsList.find(station => {
    const cleanName = station.stationName.replace(/\s+asema$/i, '');
    const formatted = `${cleanName} (${station.stationShortCode})`;
    return formatted.toLowerCase() === userInput.toLowerCase() || 
           station.stationShortCode.toLowerCase() === userInput.toLowerCase();
  });

  // If a valid station is found, fetch its live timetables for the user
  if (matchedStation) {
    loadTrainSchedules(matchedStation.stationShortCode);
  }
});

// 3. Fetch live trains, sort them chronologically, and render the timetable
function loadTrainSchedules(stationCode) {
  const url = `https://rata.digitraffic.fi/api/v1/live-trains/station/${stationCode}?arriving_trains=20&departing_trains=20`;

  fetch(url)
    .then(response => response.json())
    .then(trains => {
      const tbody = document.getElementById('timetable-body');
      tbody.innerHTML = ''; // Clear previous table rows

      if (trains.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="empty-state">No active trains found for this station.</td></tr>`;
        return;
      }

      let tableRows = [];

      // Process each train object returned by Digitraffic
      trains.forEach(train => {
        // Find the specific stop for our chosen station
        const stop = train.timeTableRows.find(row => row.stationShortCode === stationCode);

        if (stop && stop.commercialStop) {
          // Identify origin and destination station codes
          const originCode = train.timeTableRows[0].stationShortCode;
          const destCode = train.timeTableRows[train.timeTableRows.length - 1].stationShortCode;

          // Look up friendly city names for origin and destination
          const originObj = stationsList.find(s => s.stationShortCode === originCode);
          const destObj = stationsList.find(s => s.stationShortCode === destCode);

          const originName = originObj ? originObj.stationName.replace(/\s+asema$/i, '') : originCode;
          const destName = destObj ? destObj.stationName.replace(/\s+asema$/i, '') : destCode;

          tableRows.push({
            train: train,
            stop: stop,
            originName: originName,
            destName: destName,
            timeObject: new Date(stop.scheduledTime) // Used for chronological sorting
          });
        }
      });

      // Sort rows chronologically by scheduled time (earliest first to make it easier for users to read)
      tableRows.sort((a, b) => a.timeObject - b.timeObject);

      // HTML rows into the table
      tableRows.forEach(item => {
        const train = item.train;
        const stop = item.stop;

        // Format time to HH:MM
        const timeString = item.timeObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Identify train identifier (train number)
        const trainName = train.commuterLineID ? `Line ${train.commuterLineID}` : `${train.trainType} ${train.trainNumber}`;
        const typeString = stop.type === 'DEPARTURE' ? 'Departure' : 'Arrival';
        const trackNum = stop.commercialTrack || '-';

        // Format route description
        const routeText = stop.type === 'DEPARTURE'
          ? `To <strong>${item.destName}</strong> <small>(from ${item.originName})</small>`
          : `From <strong>${item.originName}</strong> <small>(to ${item.destName})</small>`;

        // Format status / delays, shows how much it is delayed or if it's cancelled
        let statusHtml = `<span class="badge status-ontime">On time</span>`;
        if (train.cancelled || stop.cancelled) {
          statusHtml = `<span class="badge status-delayed">Cancelled</span>`;
        } else if (stop.differenceInMinutes > 1) {
          const estTime = new Date(stop.liveEstimateTime || stop.scheduledTime);
          const estStr = estTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          statusHtml = `<span class="badge status-delayed">${estStr} (+${stop.differenceInMinutes} min)</span>`;
        }

        const badgeClass = train.trainCategory === 'Commuter' ? 'badge badge-commuter' : 'badge badge-long';

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><span class="${badgeClass}">${trainName}</span></td>
          <td>${typeString}</td>
          <td>${routeText}</td>
          <td><strong>${timeString}</strong></td>
          <td>${statusHtml}</td>
          <td><span class="track-box">${trackNum}</span></td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Error loading train schedules:', error);
    });
}