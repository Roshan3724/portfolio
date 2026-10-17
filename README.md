# Pawan Khatiwada - Portfolio

A responsive, static portfolio website built with HTML, CSS, and vanilla JavaScript. There is no build step or package installation required.

## Run locally

From the project directory, start any static file server. For example:

```powershell
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Deploy to Vercel

Import this repository in Vercel and use the **Other** framework preset. Leave the build command and output directory empty; Vercel serves `index.html` and the included assets directly. No `vercel.json` configuration is needed.

## Personalize before publishing

- Add the inbox address for the contact form to `contactEmail` in `assets/js/main.js`. Until set, the form explains that the address needs to be configured.
- Review the project descriptions in `index.html` and replace them with case-study details, project links, and your role where appropriate.
- Review the name, bio, skills, and metadata in `index.html` to ensure they match your preferred public profile.
