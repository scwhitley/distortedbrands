# distortedbrands.com

The parent site for Distorted Brands LLC: Distorted Games, Distorted Web, Mr. Distort, Distorted Bass and Distorted Pours.

Plain HTML, CSS and JavaScript. No framework and no build step, so any page can be edited directly.

## Pages

| URL | File |
| --- | --- |
| `/` | `index.html` |
| `/games/` | `games/index.html` |
| `/web/` | `web/index.html` |
| `/mr-distort/` | `mr-distort/index.html` |
| `/bass/` | `bass/index.html` |
| `/pours/` | `pours/index.html` |
| `/contact/` | `contact/index.html` |
| `/thanks/` | `thanks/index.html` (where forms land after sending) |
| 404 | `404.html` |

Styles are in `css/site.css` (brand colors at the top). `js/site.js` runs the mobile menu, the copy buttons and the contact form topic.
Logos and icons in `assets/` come from the Distorted Brands brand kit.

## Hosting (Netlify)

1. In Netlify, choose **Add new site → Import an existing project** and pick this repo.
2. Leave the build command empty. The publish directory is the repo root (already set in `netlify.toml`).
3. Under **Domain management**, add `distortedbrands.com` and follow Netlify's DNS steps.

## Forms

Each brand page has its own pop-up form (Netlify Forms). Netlify detects them on deploy, and each one
carries a hidden `subject` field so the notification email has a clear subject line.

| Form | Page | Send notifications to |
| --- | --- | --- |
| `web-consult` | /web/ | web@distortedbrands.com |
| `games-newsletter` | /games/ | games@distortedbrands.com |
| `mr-distort-booking` | /mr-distort/ | booking@distortedbrands.com |
| `bass-newsletter` | /bass/ | bass@distortedbrands.com |
| `bass-booking` | /bass/ | bass@distortedbrands.com |
| `pours-list` | /pours/ | pours@distortedbrands.com |

To route them: **Site configuration → Forms → Form notifications → Add notification → Email notification**,
pick the form, enter the inbox, save. Repeat for each row. Replies go straight to the person who filled in the form.
