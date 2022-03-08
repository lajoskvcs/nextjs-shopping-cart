# Assumptions

## DaisyUI
I wanted to deliver a better look and feel, so I added DaisyUI to the project. It is a tailwindcss based UI kit.

## SCSS and SCSS modules
I really like utility-classes, but I wanted to separate the styling by components, so for the sake of easier code organization, I used scss and scss modules for component styling.

## Product info page
I decided to create a product info page, where the user can check for further info about the product and can manage the quantity during add to cart action.

## Cart handling
For the sake of simplicity, I used sessionStorage and saved the whole `Product` object as a `CartItem` and not only the `gtin` identifier.
I didn't want to make requests to fetch the products by `gtin` during page load.(Although, I know that this approach introduces some error cases.)

## SSR and Client side fetch
For the Product info page, I used server side data fetching, because it is a SEO heavy part of the app, a product page may appear in google searches.
For the product list, the client side data fetching is perfectly fine.

## Global state management
This application is too small for a heavy state management lib like MobX or Redux, so I used the Context API.

