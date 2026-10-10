<div align="center">

# 🏁 REDLINE

### Motorsport Data. One Independent Dashboard.

An independent motorsport dashboard for race schedules, results, driver statistics and the details behind every lap.

[**Open Redline →**](https://redlinef1.github.io/)

*Explore the numbers. Follow the story. Understand every lap.*

</div>

---

## 🏎️ Meet Redline

Redline is an independent, fan-made motorsport data dashboard. It brings race information, championship standings, driver statistics and session data together in one responsive, easy-to-explore experience.

Whether you're checking the next Grand Prix, comparing drivers across a season, revisiting historic results or keeping up with the paddock, Redline puts the essentials in one place.

## ✨ What You Can Explore

### 📰 News Sources — Read at the Publisher
- Visit a directory of links to Formula 1 and motorsport publishers.
- Open stories on the original publisher's website.
- Redline does not fetch, cache, aggregate or republish publisher headlines, article descriptions or article images in this version.

*This change is a conservative choice to reduce content-reuse risk. Each publisher's own terms still apply when visiting its site.*

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

Redline combines modern session data with historical results so you can move between current-season coverage and earlier championship seasons. It is an independent fan project, not an official Formula 1 service.

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
| Publisher links | Direct links to external news websites without republishing feed content |
| GitHub Pages | Static website hosting |
| GitHub Actions | Scheduled historical archive refresh |

Redline is intentionally kept lightweight and is hosted as a static website. Some data services may apply rate limits, have outages or restrict browser access, so availability can vary.

## 🚦 Project Status

Redline is an active personal project. The core experience is built around seven areas: **News Sources, Driver Stats, Calendar, Standings, Race, Live and Telemetry**. Improvements focus on reliability, historical coverage, data presentation and usability.

The project does not follow a fixed release schedule. Future ideas may include deeper statistics, additional comparisons and further data visualisations as time and data availability allow.

## ⚠️ Disclaimer

Redline is an independent, unofficial fan project and is **not affiliated with, endorsed by, sponsored by, or associated with the Formula 1 companies, the FIA, or any Formula 1 team**.

The website footer includes the disclaimer specified in Formula 1's published [trademark and intellectual-property guidelines](https://www.formula1.com/en/information/guidelines.4EOKE9RRqevL4niTK9kWyt). Formula 1, F1, FORMULA ONE, GRAND PRIX and related marks belong to their respective owners. Redline uses original branding and text-based team labels rather than official team logos.

Race data is provided through third-party services, including OpenF1 and Jolpica-F1. Their terms, licensing conditions, attribution requirements and data availability may apply. This README and the website disclaimer do not grant rights or guarantee legal compliance.

## 📜 License

Please refer to the repository for the applicable license and usage terms.

---

<div align="center">

### Built for the fans who love the details.

**Lights out. Data on.** 🏎️

[Visit Redline](https://redlinef1.github.io/) · [View the source](https://github.com/redlinef1/redlinef1.github.io)

</div>
