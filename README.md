# School Management API

## Overview
This project provides APIs to manage school data.  
Users can add schools and retrieve schools sorted by distance from a given location.

## Tech Stack
- Node.js
- Express.js
- MySQL
- Hosted on Render

## Live API
https://school-management-api-38c5.onrender.com

## Endpoints

### Add School
POST /api/addSchool

Example request body:

{
  "name": "ABC School",
  "address": "Hyderabad",
  "latitude": 17.385,
  "longitude": 78.4867
}

---

### List Schools
GET /api/listSchools?latitude=17.385&longitude=78.4867

Returns schools sorted by proximity to the user location.

## Setup Instructions

1. Clone the repository
2. Install dependencies

npm install

3. Create a `.env` file based on `.env.example`
4. Start the server

node server.js