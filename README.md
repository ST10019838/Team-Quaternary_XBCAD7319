# Team-Quaternary_XBCAD7319_POE

Welcome to the repository! This repo contains all of the solutions to Team Quaternary's XBCAD7319 POE.

Team Members:

- ST10019838 - Damian Dare
- ST10019972 - Guillaume Swanevelder
- ST10091991 - Christiaan Versfeld
- ST10158660 - Ruan Zwarts

</br>

Main Repository Link:

https://github.com/ST10091991/Team-Quaternary_XBCAD7319.git

</br>
NOTE:

- **NB!**: The application is still being developed and bugs are to be expected. Updates will be made as the project is still ongoing as per the work agreement.

- **NB!**: The approapriate environment variables are required to use the application. We did include the ".env.local" file so everything should be fine. (We understand that it is bad practice to include the ".env" files, however as this creates a security risk, we included it to ensure the application can be run.)

- If you run into any issues, please feel free to contact Damian to assist in the set up.

- I forgot to mention in the tutorial that lessons of the users skill level will only be displayed. For example: "Beginner" level customers can only see and book "Beginner" level lessons

</br>

## Table of Contents

- [Credentials](#credentials)
- [Components of this repository](#components-of-this-repository)
- [Project Description](#project-description)
- [How to Use](#how-to-use)
- [Project Set Up](#project-set-up)
  - [Prequisites](#prequisites)
  - [Installation](#installation)
  - [How to Run](#how-to-run)
- [Tech Stack](#tech-stack)

</br>

## Credentials

**_Admin Account:_**
- Email: admin@gmail.com
- Password: Password

**_Coach Account:_**
- Email: coach@gmail.com
- Password: Password

**_Customer Account:_**
- Email: user@gmail.com
- Password: Password

</br>

## Components of this repository

- application - a folder containing source code for the project
- documentation - a folder containing all documentation for the project (**PRIMARILY THE RESEARCH**)
- tutorials - a folder containing all video tutorials for the project

</br>

# Project Description

This application aims to streamline the horse riding lesson space by providing an efficient mechanism to allow users to quickly book horse riding lessons, and to allow staff to not only quickly create horse riding lessons but also manage them with ease.

The primary functions / features of the application (so far...) include:

- Lesson booking (users)
- Lesson management (admins / coaches)
- Partial user management (admins)
- Data management for faster lesson creation (admins)

</br>
</br>

# How To Use

The following tutorials can found be under the Tutorials folder:

- Team_Quaternary_XBCAD7319_Tutorial

</br>
</br>

# Project Set-Up

## Prequisites

Below are the following items/tools that need to be installed
before using the application:

- Visual Studio Code (The latest version)
- Node (The latest version)

</br>

## Installation

1. Clone the repository **(NB: clone to a local drive)**:

```bash
 git clone https://github.com/ST10091991/Team-Quaternary_XBCAD7319.git
```

2. Open the repository folder under in VSCode

3. Navigate to the "application" folder

4. Install dependencies:

```
 npm install
```

</br>

## How to Run

1. Navigate to the "application" folder

2. Open a terminal in the project location

3. Start the application by running the following command in the terminal:

```
 npm run dev-https
```

4. Navigate to "https://localhost:3000"

5. Enjoy!

</br>

## Tech Stack

- Next.js (React Framework)
- Database + Api (Supabase)
- Clerk (Authentication)
- Tailwind CSS (user interface)
- shadcn/ui (user interface)
