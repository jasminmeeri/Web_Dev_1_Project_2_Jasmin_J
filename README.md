# Train Station Timetables

**Author:** Jasmin Järvinen

---

## Project plan

### Project idea
It is a responsive web application designed for people who travel by railways in Finland. The application fetches real-time railway timetable data from Fintraffic's open Digitraffic API, allowing users to quickly search for any Finnish passenger railway station and view live arrivals, departures, route endpoints, track numbers, and potential delay estimates in a clear layout that is meant to feel like a transit-board.

### Planned features
- **Dynamic Station Search with Autocomplete:** Fetches Finnish railway station metadata from the API and populates an HTML5 datalist so users can search by station name or short code.
- **Live Station Timetables:** Retrieves real-time arrival and departure data for the selected station, sorting trains chronologically from earliest to latest.
- **Route, Track, and Status Displays:** Displays whether each train is arriving or departing, its origin and final destination, assigned platform track, and real-time status badges.

### Wireframe / sketch (Made with Figma)

<img width="2454" height="1579" alt="image" src="https://github.com/user-attachments/assets/cb1de8be-e65e-495c-bd4a-e8ae888d0c2a" />



---

## Web links
- **Published application on Netlify:** (https://jasminjtrainschedule.netlify.app/)
- **GitHub repository:** (https://github.com/jasminmeeri/Web_Dev_1_Project_2_Jasmin_J/)
- **Project video presentation:**

---

## About the application
**Train Station Timetables** is a single-page web application that provides live train schedules. The application translates JSON streams from the Digitraffic Railway API into a easily readable real-time timetable table.

---

## Technologies
- **HTML** – Semantic page structure, autocomplete container, timetable layouts etc.
- **CSS** – Custom styling using CSS variables, Flexbox, a responsive transit board layout styled with warm brown colors etc.
- **Native JavaScript** – Fetching API, JSON data filtering and chronological sorting etc.

---

## How to use the application
1. Open the published application using the web link above.
2. Click the **Search Station** input field and start typing a Finnish railway station name (e.g., *Helsinki*, *Tikkurila* or its short code (e.g., *HKI*, *TKL*).
3. Select a station from the autocomplete suggestions or finish typing its name/code.
4. View the live timetable displaying trains, scheduled times, arriving/departing, route, status/delays, and track numbers.

---

## Screenshots

<img width="1593" height="477" alt="image" src="https://github.com/user-attachments/assets/4ecd563d-1b7f-4e18-98b8-17d477e47f04" />

<img width="1577" height="1248" alt="image" src="https://github.com/user-attachments/assets/d76a0234-6693-4bf9-aa2f-f365e5c762f3" />

---

## Known issues / limitations
- The timetable displays maximum amount of the next 20 arriving and 20 departing trains returned by the API at the moment of search so users must re-select or re-enter the station to refresh live delay updates.
- Only stations marked with `passengerTraffic: true` in Digitraffic metadata are included in the search suggestions to simplify the search, if someone wanted to find other stations, those are excluded from the current list of stations.

---


## Self-assessment and learning reflection
- **What did I succeed in?**  
  I succeeded in building a working live timetable application native JavaScript, HTML, and CSS. I learned to use APIs and I succeeded in it so that the API fetches station metadata so that the app can translate short codes like HKI into full Finnish city names, and then displaying a clean transit-board style layout with all the needed information. I learned how to use APIs in my code and how to e.g. mark the copyrights of the API. My friend advised me with the CSS, for example with the colors and how I can use colors like var(--primary) and other useful tips like that! I tried to reuse the same method throughout the whole css file. 
- **What was challenging?**  
  The most challenging part was navigating the nested JSON structure returned by Digitraffic. It felt difficult at first to understand what are the features and parts that I must and want to include in the project. I used Gemini AI to help my selection and to help me with a basic layout for the javascript, which helped a lot. 
- **What would I improve if I had more time?**  
  If I had more time, I would add a subtle auto-refresh feature  so commuters can leave the page open without having to re-enter the station name.
- **What did I learn about HTML, CSS, JavaScript and DOM scripting?**  
  I learned how to handle asynchronous data fetching and how to pair a standard <input> with an HTML <datalist> for clean, built-in autocomplete suggestions. On the CSS, I learned how to make consistent color themes and how to add easily understandable colors e.g. on the estimate status, green for on time and red for a delay. 
- **What remained unclear or what would I like to learn more about?**  
  I would like to learn more about all the possibilities with Javascript and APIs and how to be more confident with using them. Right now I feel that by making more projects independently will make me better at this, feels like the possibilities are endless!
- **My self-assessed project grade:** 7/10 points

---

## Sources and acknowledgements

### Sources 
- Fintraffic. No date. Digitraffic – Railway traffic. Accessed 17 November 2026. https://www.digitraffic.fi/en/railway-traffic/
- Fintraffic. No date. Digitraffic Railway API – Live Trains for Station (HKI). Accessed 17 November 2026. https://rata.digitraffic.fi/api/v1/live-trains/station/HKI/
- Fintraffic. No date. Digitraffic Railway API – Station Metadata. Accessed 17 November 2026. https://rata.digitraffic.fi/api/v1/metadata/stations/
- Fintraffic. No date. Digitraffic Railway API – Swagger UI Documentation. Accessed 17 November 2026. https://rata.digitraffic.fi/swagger/
- Fintraffic. No date. Junalähdöt – Live Station Departures and Arrivals. Accessed 17 November 2026. https://junalahdot.fi/junalahdot/main?lang=3

### AI tools used
- **AI tool used:** Google Gemini
- **How the tool was used:** Used mainly as a coding assistant and tutor to structure the native JavaScript. Gemini AI was used to help when being stuck with the javascript. It helped me find the parts of the Digitraffic website that I truly need in my simple application. I used Gemini AI to check that my copyright information is documented well enough and used it's suggestions to better it. All generated code was reviewed and tested according to my best knowledge and skills.




