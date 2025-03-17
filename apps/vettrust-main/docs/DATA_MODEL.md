# Contentful Data Model Notes in Vettrust


## Abbreviation
* DS : Design System
* CA : Clinica Alpina
* MA : Main app

## Content Types
* Every content type has the following structure `Category__Name` (e.g. `Collection__News`, `Page__About`) where the prefix stands for the category of the content.
* The content type `Collection__BlogArticle` is used for blog posts which are also called `Animal Knowledge` in the CMS
* The content type `Collection__NewsArticles` is used for news articles which are also called `News Articles` in the CMS
* For Rich Text there is a component in the DS to parse it based on the requirements of the design System on Figma
* There is a content type named `Pages__LocationCommonMetadata` whose key is `page__location`. The role of this one is to kind of gather every metadata that all subpages of locations need. for example images for the pet rescue section, etc.
* There was a need in the logic of the app to have a many to many (M:N) relationship between Animal Types and Services. For that we created a content type `collection__serviceAnimalRelations` that only stands for the relationship between the two.
* To differentiate pages that should SSG built for each platform (CA & MA) we introduced a key in all content types where it made sense. The key is called `Platform URL` and it has the values vettrust.ch, staging.vettrust.ch, clinica-alpina.ch, staging.clinica-alpina.ch. The logic here is that on build time, the process would only pull content types that correspond to the associated platform url of the site being built. Check for example the `collection__locations` collection
* Checkout this [ER Diagram](https://app.diagrams.net/#G1Gx36dvCqErX26gnsJmAXojBmZsyOgM1z) for more details 
