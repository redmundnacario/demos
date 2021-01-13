import { Questions } from './functions.js';

document.body.onload = (event) => {
    const App = new Questions()
    // initialize
    App.InitializeApp();
    // create submit button once
    App.createButtonSubmit();
    // Add event on submit button
    App.submitBtn.onclick = () => App.submitAnswer();
    // Add event on exit button
    App.exitBtn.onclick = () => App.exitApp();
};
