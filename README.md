# WPGens WordPress React Admin Panel

:star: Star us on GitHub — it motivates us a lot!

WPGens WordPress React Admin Panel is a professional looking WordPress administration panel for plugins written in TypeScript with [WP REST API](https://v2.wp-api.org/) and [React](https://reactjs.org/). Its simple to extend and use for your own WordPress plugins. Check out the demo [here.](https://wpgensdemo.com/wp-admin/admin.php?page=gens-raf)

![wpgens-admin-panel](https://raw.githubusercontent.com/goranefbl/stuff/main/raf-admin-panel.webp)

## Table Of Content

-   [About Project](#about-project)
    -   [Project Stack](#project-stack)
    -   [Technology Overview](#technology-overview)
-   [Installation](#installation)
    -   [How to run the demo](#how-to-run)
    -   [How to use on your projects](#ddev)
-   [License](#license)
-   [Links](#links)

## About Project

WPGens WordPress React Admin Panel was built to modernize the building and the look of WordPress plugins administration panel. Instead of using Settings API, we are communicating with the backend through REST API, allowing the use of modern technologies. @wordpress/api-fetch also simplified the flow.

### Project Stack

WPGens WordPress React Admin Panel is written in **TypeScript**. **React hook form** is used for settings panel forms, **@wordpress/api-fetch** to securily communicate with WordPress backend. **TailWind CSS** for styling (easy to start with, just set up your IDE), **React Query** optimizes data management by efficiently handling fetched data, reducing the need for extensive manual state management, **yup** is used for form validation to ensure data integrity before submission. We are also using **vite** instead of webpack to build the app and serve the HMR. The only UI libraries are **React Select** and **React Color**. We can add more libraries but the goal is to keep it light and simple.

### Technology Overview:

Written in Typescript with following libraries:

-   **TypeScript**: The entire WPGens WordPress React Admin Panel is written in TypeScript, offering type safety and improved development workflows.

-   **React**: A JavaScript library for building user interfaces. It offers a component-based approach to develop interactive UIs efficiently.

-   **WordPress API Fetch (@wordpress/api-fetch)**: This package provides functions to interact with the WordPress REST API securly. It allows fetching data from the WordPress backend, enabling seamless integration with WordPress functionalities.

-   **React Hook Form (@react-hook-form)**: A library for managing form state and validation in React using hooks. It simplifies the process of building complex forms by providing an intuitive API.

-   **Tailwind CSS**: A utility-first CSS framework that provides a set of pre-built CSS classes to rapidly build custom designs without leaving your HTML.

-   **React Query (@react-query)**: A library for managing and caching asynchronous data in React applications. It optimizes network requests, caching, and state management, enhancing the performance of data-fetching operations.

-   **Yup**: A JavaScript schema validation library used for defining and validating the shape of data. It's often utilized in conjunction with form libraries like React Hook Form for defining validation rules.

-   **Vite**: A build tool that offers fast and optimized development and production builds for web applications. It provides a modern development environment with features like hot module replacement (HMR) and lightning-fast build times.

-   **React Select (@react-select)**: An elegant and efficient dropdown select component for React. It provides a highly customizable and feature-rich interface for selecting options.

-   **React Color (@react-color)**: A library that offers a collection of color pickers and tools for integrating color selection and manipulation into your React applications.

### Supported fields

-   Input Field
-   Select Field
-   React Select (multiselect)
-   Toggle Field
-   TextArea
-   Color Picker

Open for PR's for more fields like Date picker.

## Installation

Minimum requirement is PHP 7.3+

### How to run the demo

To run the demo in your WordPress installation, you just need to:

```bash
Download the repository.
Copy it to the WordPress plugins folder
Activate the plugin
```

### How to use in your projects

```bash
Download the repository.
Copy to the WordPress plugins folder
Activate the plugin
Open the project
Navigate to the includes/admin/backend
install scripts with pnpm install or npm install
run pnpm run dev
Activate the plugin
```

_Note:_ When ziping plugin files, you do not need backend folder, just index.js file that was built inside assets/js folder.

## License

The WPGens WordPress React Admin Panel is licensed under the terms of the GPL Open Source license and is available for free.

## Links

-   [Demo](https://wpgensdemo.com)
-   [WP Rest API](https://v2.wp-api.org)
-   [React](https://reactjs.org)
-   [Vite](https://vitejs.dev)
-   [React Query](https://tanstack.com/query/v3/)
-   [React Hook Form](https://react-hook-form.com/)
-   [Tailwind](https://tailwindcss.com)
