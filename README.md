# Momma Jo's Daily Bread

A polished, responsive static website built for GitHub Pages.

## Included

- Branded home page using the provided logo
- Daily Bread verse and devotional that changes by date
- Previous, Today, and Next devotional controls
- Monthly event calendar
- Upcoming event list
- Event submission form that prepares an email
- Mobile navigation and responsive design
- Cottage baker regulation footer

## Publish on GitHub Pages

1. Create a new GitHub repository, such as `momma-jos-daily-bread`.
2. Upload every file and folder from this project.
3. Open the repository's **Settings**.
4. Select **Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/ (root)` folder, then save.
7. GitHub will provide the public website address after deployment.

## Important setup

### Add the bakery email

Open `script.js` and replace:

```js
YOUR_EMAIL_HERE
```

with the email address that should receive event submissions.

### Edit Daily Bread messages

Open `data.js` and edit the objects inside `DAILY_BREAD_ENTRIES`.

The site cycles through the entries according to the day of the year. Add as many entries as desired.

### Edit events

Open `data.js` and edit the objects inside `EVENTS`.

Use dates in this format:

```text
YYYY-MM-DD
```

Example:

```js
{
  title: "Holiday Bake Sale",
  date: "2026-12-05",
  time: "9:00 AM – 1:00 PM",
  location: "Community Center",
  description: "Fresh holiday breads, cookies, cakes, and pies."
}
```

## About submissions

GitHub Pages is a static host and does not include a private database or secure admin panel. The included form opens the visitor's email app with all event information filled in. This lets Momma Jo review submissions before manually adding approved events to `data.js`.

For automatic form storage later, connect the form to Formspree, Basin, Netlify Forms, or a small backend service.


## GitHub Pages file layout
Upload every file directly to the repository root. The logo is referenced as `./logo.jpg`, so no folders are required.
