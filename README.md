# Employee Registration Application

## Overview

A responsive Employee Registration application built using Angular with Reactive Forms, custom validators, reusable directives, and local storage persistence.

## Features

* Employee registration form with proper error message for all possible condition or state
* Responsive UI design
* Password visibility toggle
* Confirm password validation
* Cross-field validation
* Age validation (18+)
* Future date restriction 
* Email uniqueness validation
* Local storage persistence
* Custom snackbar notifications
* Loading state during submission of form
* Form reset functionality 
* Input restriction directives (only numbers/ character or both)
* Prevent leading empty space
* Real-time form validation
* Added Favicon 

## Angular Concepts Used

* Standalone Components 
* Reactive Forms
* Custom Validators
* Async Validators
* Custom Directives
* Dependency Injection
* RxJS (BehaviorSubject, Observable)
* Local Storage Integration
* Angular Material Icons
* Form State Management (dirty, touched, pristine)
* Angular routing 


## Custom Validators

* Age Validator
* Future Date Validator
* Password Match Validator
* Email Exists Async Validator
* No Leading Space Validator

## Custom Directives

* Input Restriction Directive
* Paste Handling
* Character Filtering

## Project Structure

* components
* services
* custom-validators
* custom-directives
* public/assets

## How to Run

1. Set Node.js version to 18.20  using `nvm use` command, If the version specified in .nvmrc is not installed, run `nvm install`
2. Install dependencies using `npm install`
2. Run the application using `ng serve`
3. Open `http://localhost:4200`

## Enhancements

* Backend API Integration
* Employee Listing Page
* Edit/Delete Employee
* Route Guards 
