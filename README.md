# Time for Climate Action (TFCA) - Next.js Web Application

The TFCA Web App enables individuals to take quick, but powerful actions in just a few clicks and invite your friends to join the movement.

## Architecture: SSG with a couple of dynamic elements

Since traffic spikes for the App can be significant, we decided to build a mostly static Web App that is pre-rendered during build time. Except for the following elements, the entire app is static:

### Switch Energy API

We use the switch energy API from "Switch for the Climate" to allow visitors to change their energy provider inside of the app

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

No Typescript unfortunately. The project is written in pure Javascript. Mainly due to time constraints and missing TS knowledge with parts of the team. We might rewrite it next year in TS.

## Tracking

We use GraphJSON for simple event tracking. No GA, because we care about privacy.

## Contributing

1. Create a new branch for your changes that includes a [scope](#scopes) (e.g. `feat/my_awesome_new_feature`)
2. Commit your changes including a [scope](#scopes) in the commit message (e.g. `feat: added my awesome new feature`)
3. Create a PR and give it a title that also includes a [scope](#scopes) (e.g. `feat: added my awesome new feature`)

### Scopes

For branch names, commit messages and PR titles we follow a simplified version of the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) specification by ensuring we always add a scope to our name/message/title.

Use one of the following scopes:

- `feat`: new feature for the user
- `fix`: bug fix for the user
- `refactor`: refactoring code, eg. renaming a variable
- `test`: adding missing tests, refactoring tests; no production code change
- `style`: formatting, missing semi colons, etc; no production code change
- `ci`: changes to the CI configuration files and scripts
- `chore`: updating autamated scripts, project setup etc; no production code change
- `docs`: changes to the documentation

#### Usage with branch names

For branch names we use a `/` as delimiter:

```
feat/my_awesome_feature
```

#### Usage with commit messages

For commit messages we use a `:` as delimiter:

```
feat: added some new feature
```

#### Usage PR titles

For PR titles we use a `:` as delimiter:

```
feat: added some new feature
```
