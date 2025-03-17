# Getting Started

## Abbreviation
* DS : Design System
* CA : Clinica Alpina
* MA : Main app

## About the project

The project consists of 3 main parts:
1. [The main app](https://github.com/somethingcreative-agency/vettrust-main) built with NextJS
2. [The Clinica Alpina App](https://github.com/somethingcreative-agency/vettrust-clinica_alpina) built with NextJs (Shadowing the main app)
3. [The Design System](https://github.com/somethingcreative-agency/vettrust-design_system) built with [microbundle-crl](https://www.npmjs.com/package/microbundle-crl)


## Development

To get started with any of the apps, make sure that you have access to the DS repo on github. Then create a personal access token on github. It should have at least the `read:packages` access right.

### [The main app](https://github.com/somethingcreative-agency/vettrust-main)

1. Installation

* Before installing packages, make sure you have exported an env variable called `NODE_AUTH_TOKEN` and give it the value of the github access token created earlier. (NOTE:(@nkpremices): What I usually do is to just add it to my local .zshrc. So I'd advise to do the same or add it to your equivalent file for your shell)
* Make sure you have all required environment 
* The app uses [next-i18next](https://github.com/i18next/next-i18next) and [i18nexus](https://i18nexus.com) for internationalization. So before starting the app, make sure that all translations are up to date by pulling them with the command `yarn i18n:local-pull`
* Start the app and have fun

2. Libraries that are worth mentioning

a) jotai: For state management (check the atoms folder)
b) next-i18next: For internationalization
c) mui: The components library (check out the material ui website)
d) formik: for form validations

2. Development Process

* Almost all components of the app come from the DS. So at some point you might have to develop along with the DS. To do that, you need to have the DS cloned in a local directory and then npm link it by changing its entry in package.json.

Example:
```
"@somethingcreative-agency/vettrust-design_system": "^1.0.1-alpha.1677016997"
```

changed into
```
"@somethingcreative-agency/vettrust-design_system": "link:../vettrust-design_system"
```

assuming that the MA and the DS share a parent dir like this:
```
parent-dir
    ├── vettrust-main
    └── vettrust-design_system
```
and then run `yarn install` once again.

* Every time after making changes in the DS, you need to run the command `yarn prepare` on the side of the DS to have the changes reflected on the side of the NextJs app. (NOTE(@nkpremices): There is room for improvement here but didn't have enough time to implement it. check the General Notes Section)

* Follow instructions in the `development process` section of the DS to publish a new version of the DS

* After publishing the new version on the github registry, pull it on the side of the NextJs app by simply running `yarn add @somethingcreative-agency/vettrust-design_system`. This will remove the npm link and pull the new version of the DS.

* Commit your changes on the side of the NextJS app
* Push to create a PR


### [The Clinica Alpina App](https://github.com/somethingcreative-agency/vettrust-clinica_alpina)

1. Installation

* Before installing packages, make sure you have exported an env variable called `NODE_AUTH_TOKEN` and give it the value of the github access token created earlier. (@nkpremices: What I usually do is to just add it to my local .zshrc. So I'd advise to do the same or add it to your equivalent file for your shell)
* Make sure you have all required environment 
* The app uses [next-i18next](https://github.com/i18next/next-i18next) and [i18nexus](https://i18nexus.com) for internationalization. So before starting the app, make sure that all translations are up to date by pulling them with the command `yarn i18n:local-pull`
* Start the app and have fun

2. Libraries that are worth mentioning

a) jotai: For state management (check the atoms folder)
b) next-i18next: For internationalization
c) mui: The components library (check out the material ui website)
d) formik: for form validations

2. Development Process

* Almost all components of the app come from the DS. So at some point you might have to develop along with the DS. To do that, you need to have the DS cloned in a local directory and then npm link it by changing its entry in package.json.

Example:
```
"@somethingcreative-agency/vettrust-design_system": "^1.0.1-alpha.1677016997"
```

changed into
```
"@somethingcreative-agency/vettrust-design_system": "link:../vettrust-design_system"
```

assuming that the MA and the DS share a parent dir like this:
```
parent-dir
    ├── vettrust-clinica_alpina
    └── vettrust-design_system
```
and then run `yarn install` once again.

* Every time after making changes in the DS, you need to run the command `yarn prepare` on the side of the DS to have the changes reflected on the side of the NextJs app. (NOTE(@nkpremices): There is room for improvement here but didn't have enough time to implement it. check the General Notes Section)

* Follow instructions in the `development process` section of the DS to publish a new version of the DS

* After publishing the new version on the github registry, pull it on the side of the NextJs app by simply running `yarn add @somethingcreative-agency/vettrust-design_system`. This will remove the npm link and pull the new version of the DS.

* Commit your changes on the side of the NextJS app
* Push to create a PR


### [The Design System](https://github.com/somethingcreative-agency/vettrust-design_system)

1. Installation

* Make sure you have all required env variables
* Install all packages
* Start making changes

2. Development Process

After you are done with the development and are ready to push/publish the changes, you need to do the following on the side of the DS:
a) Commit your changes
b) **After committing** create a new version of the DS by running `yarn changelog` (NOTE(@nkpremices): This command runs a script that appends the current date's timestamp to the major version of the DS. Feel free to change the major semantic version according to how the DS evolves over time)
c) The `changelog` command will create new entries in the `CHANGELOG.md` file but also update the new version in package.json. So you need to commit that.
d) Push and create a PR on github.
e) A successful PR Merge on github will npm publish the new version to the github npm registry


## General Notes

> NOTE(@nkpremices): All these limitations would have been solved differently if we had more time. So the only constraint here was really development time and making sure we deliver on promised deadlines. Which were drastically out of line, but that's not the point here.

### Design System Limitations


* The design system was built for multiple reasons that won't be stated here but in a nutshell it was to have a single place where the looks/theme of the whole website could change from but keep both sites CA and MA look the same.

* The way it was initially built was to take absolutely all components from the NextJs apps and load them from there. However down the line, there are probably those components that obviously don't need to be part of the DS. The aim would be to take them back.

* In the shared directory, there is a function that the hero use to set the height, it’s best that it is shipped back to the nextJs app

* The logic around modals is that they are loaded from a central point in the app. There is an atom that one need to just implement in a component and then mutate its value. The issue is that there are some modals that would probably make sense to just stay within the NextJs apps. There is room to improving that logic to kind of load modals from both the DS and the NextJs apps

* The DS should have it’s own i18n setup that can sync with the main app’s 18n context. It's definitely possible to have a context that loads only translations that would universally never change. We don't need to duplicate them in all NextJs apps the way it is right now.

* The overall dependency/props layer of the DS could use some improvements. For example, because it wasn't working to call the `useRouter()` in the DS and then have the router redirect on the side of the NextJs apps, you will see that all buttons have a router prop. I think a way to improve that is to maybe expose an init function that can be called from `_app.tsx` and that kind of passes the router to the DS for it to be used ? (Just an idea (@nkpremcies))

* The previous comment applies to also things like the `useVtTranslate` hook, the `useAtom` hook etc, that are being passed around

* Finally, it would make the development soother to get the `--watch` option work because it can be too much to always build the DS to be able to see changes on the side of the NextJs apps
