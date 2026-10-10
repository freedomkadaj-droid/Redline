<div align="center">

# 🏁 REDLINE

### Everything F1. All in One Place.

Your ultimate Formula 1 companion — from the championship picture to the details behind every lap.

[**Open Redline →**](https://redlinef1.github.io/)

*Explore the numbers. Follow the story. Feel the race.*

</div>

---

## 🏎️ Meet Redline

Redline is an independent, fan-made Formula 1 dashboard built for people who love more than the final result. It brings race information, championship standings, driver statistics, live-session data and F1 news together in one responsive, easy-to-explore experience.

Whether you're checking the next Grand Prix, comparing drivers across a season, revisiting historic results or keeping up with the paddock, Redline puts the essentials in one place.

## ✨ What You Can Explore

### 📰 News — The Paddock, at a Glance
- Browse F1 stories from a collection of motorsport publishers in one feed.
- Filter articles by source and open the original publisher's story.
- Receive newly detected stories through a **New articles** control, so updates don't have to interrupt your reading.
- Refresh the feed manually, with background checks while the page is open.

*News availability depends on publisher feeds and third-party access relays. Some sources may occasionally be unavailable.*

### 📊 Driver Stats — Go Beyond the Headlines
- Explore season statistics with **Overview**, **Head-to-Head** and **Season Trends** views.
- Compare drivers and look for patterns across a championship.
- Select seasons, with historical coverage depending on the available data source.

### 🗓️ Calendar — Know What's Next
- Browse the season schedule and Grand Prix weekends.
- Check session timing and the upcoming-session countdown in your local time.
- See schedule information assembled from available F1 data sources.

### 🏆 Standings — Follow the Championship
- View the Drivers' Championship and Constructors' Championship.
- Switch between seasons to explore championship history.
- Review positions and points as data becomes available.

### 🏁 Race — Revisit the Results
- Explore race weekends and available session results.
- Browse historical seasons and rounds, including qualifying and race data where available.
- Use the season and Grand Prix selectors to move through F1 history.

### 🔴 Live — Follow the Session
- Check the current or most recent session information when data is available.
- Follow session status and timing information without digging through raw API responses.

### 📡 Telemetry — Dive Into the Data
- Explore detailed session and timing data provided by the supported data services.
- Availability and depth depend on the selected session and the data published by the APIs.

## 🕰️ F1 History

Redline combines modern session data with historical results so you can move between current-season coverage and earlier championship seasons.

- **OpenF1** provides modern Formula 1 session data, including timing, laps, drivers and other session information; its historical coverage generally starts in 2023.
- **Jolpica-F1** provides the historical-results data used for older seasons, including race results, qualifying and championship standings where available.
- Season selectors are designed to reach back to **1950**. The exact information available varies by season and endpoint.

Historical data is cached in the repository where supported, and a scheduled GitHub Actions workflow refreshes the archive. Live-session and news features still depend on their respective external services.

## 🎨 Made for the Race Weekend

- Responsive layout for desktop and mobile.
- Dark and light themes.
- A streamlined, tab-based interface.
- Persistent browser-side preferences and caching where supported.
- Lightweight static hosting with no account required.

## 🛠️ Built With

| Technology | Role |
| --- | --- |
| HTML, CSS and JavaScript | Interface and application logic |
| [OpenF1](https://openf1.org/) | Modern session, timing and telemetry data |
| [Jolpica-F1](https://jolpi.ca/) | Historical Formula 1 results and standings |
| RSS / Atom feeds | Aggregated motorsport news |
| GitHub Pages | Static website hosting |
| GitHub Actions | Scheduled historical archive refresh |

Redline is intentionally kept lightweight and is hosted as a static website. Some data services may apply rate limits, have outages or restrict browser access, so availability can vary.

## 🚦 Project Status

Redline is an active personal project. The core experience is built around seven areas: **News, Driver Stats, Calendar, Standings, Race, Live and Telemetry**. Improvements focus on reliability, historical coverage, data presentation and usability.

The project does not follow a fixed release schedule. Future ideas may include deeper statistics, additional comparisons and further data visualisations as time and data availability allow.

## ⚠️ Disclaimer

Redline is an independent, fan-made project. It is **not affiliated with, endorsed by, or sponsored by Formula 1, the FIA, or any Formula 1 team**.

Formula 1, F1, FORMULA ONE, GRAND PRIX and related marks are trademarks of their respective owners. Data and news are provided by or retrieved from third-party services and publishers; their availability and accuracy are subject to those providers.

## 📜 License

Please refer to the repository for the applicable license and usage terms.

---

<div align="center">

### Built for the fans who love the details.

**Lights out. Data on.** 🏎️

[Visit Redline](https://redlinef1.github.io/) · [View the source](https://github.com/redlinef1/redlinef1.github.io)

</div>
