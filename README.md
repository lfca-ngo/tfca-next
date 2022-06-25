# Time for Climate Action (TFCA) - Next.js Web Application

The TFCA Web App enables individuals to take quick, but powerful actions in just a few clicks and invite your friends to join the movement.

## Architecture: SSG with a couple of dynamic elements

Since traffic spikes for the App can be significant, we decided to build a mostly static Web App that is pre-rendered during build time. Except for the following elements, the entire app is static:

### Switch Energy API

We use the switch energy API from "Switch for the Climate" to allow visitors to change their energy provider inside of the app.

### Politics API

We have a simple dynamic Next.js API to find local politicians to demand climate action. You can find it in the /api folder.

## Action Modules

The "meat" of the app are the action modules. You can find them under components/ActionModules. We have 4 types of modules at the moment that power all of the actions that you find on the website:

### ActionFinder

The action finder takes a list of items that are coming from Contentful (CMS). These items can be filtered using attributes that are defined inside of the CMS. These filters can be either rendered as a separate "step" in the flow, or just as a select filter on the results view. Try the "Action at work" module as an example.

### Politics

The politics action takes a country, an optional postcode (for DE) and a topic (e.g. energy) as input and returns a list of politicians matching this query. The user can then contact those via Email.

### Quiz

A quiz has a defined set of questions and answers in Contentful. It is used in the "Food" action in the campaign.

### Switch Energy

The switch energy module powers only 1 action on the website: The german switch energy module > https://www.tfca.earth/de/deu. This module is the most complex one, since it makes use of the external Switch for the Climate API and contains a couple of complex forms.

## CI & Tests

You can find end to end tests in the e2e folder. The tests are run during build time in Github Actions before deployment.

## ISG for Microsites & Sharing feature

Every participating company gets their own TFCA microsite, e.g. https://tfca.earth/int/co/idealo - these pages are generated using Next.js ISG (Incremental Static Generation). They are built during build time, but only once the first request to the page hits. Subsequent visits get the prerendered page. We use the same technique for Visitors that receive a custom invite link.

## Deployment

We deploy the App on vercel to make use of advanced Next.js features such as ISG.

## Typescript?

Unfortunately the project is written in js. This is because I (Timo) only learned Typescript in the last couple of weeks and since we were only 1,5 Devs with very limited time for the entire project, we did not want to take the risk of slowing down the project due to me learning typescript on the go.

## Tracking

We use GraphJSON for simple event tracking. No GA, because we care about privacy.
