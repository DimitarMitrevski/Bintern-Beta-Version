const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodmailer = require('nodemailer');
const firebase = require('firebase');
const firebaseFunctions = require('firebase/functions');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     console.log("Hello from NodeJS");
//     response.send("Hello from Firebase Bintern!");
// });
require('dotenv').config()

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env;


exports.sendEmailNotification = functions.https.onCall((data, context) => {

    const email = data.email;
    const imeFirma = data.imeFirma;
    const firmaMail = data.firmaMail;
    const imePraktikant = data.imePraktikant;

    let authData = nodmailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: SENDER_EMAIL,
            pass: SENDER_PASSWORD
        }
    });
    authData.sendMail({
        from: '"Bintern MK" <bintern.info@gmail.com>',
        to: `${email}`,
        subject: `Имате покана на оглас од ${imeFirma} `,
        text: `${email}`,
        html: `<p>Почитуван/a ${imePraktikant},</p>

        <p>Ве известуваме дека имате покана на оглас од <span style="font-weight:bold;">${imeFirma}<span>.</p>
        <p>За да ги видите огласите ве молиме да го проверите вашиот кориснички панел
        во делот на Покани од компании.</p>
        
        <a href="https://bintern.com/interns/profile">Кликнете тука за да ја отворите апликацијата.</a>
        <h4>Меилот на таа компанија е: ${firmaMail}</h4>
        <p>Со почит,</p>

        <p>Тим Бинтерн
         </p>`
    }).then(res => console.log('Successfully sent that mail to an intern')).catch(err => console.log(err));

    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    return {
        emailSuccessfull: 'Email has been successfully sent to an intern'
    }
})

exports.sendEmailNotificationToCompany = functions.https.onCall((data, context) => {

    const email = data.email;
    const imePraktikant = data.imePraktikant;
    const praktikantMail = data.praktikantMail;
    const pozicija = data.pozicija;


    let authData = nodmailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: SENDER_EMAIL,
            pass: SENDER_PASSWORD
        }
    });
    authData.sendMail({
        from: '"Bintern MK" <bintern.info@gmail.com>',
        to: `${email}`,
        subject: `Иматe апликант на огласот за ${pozicija} `,
        text: `${email}`,
        html: `<p>Почитувани,</p>

        <p>Ве известуваме дека имате апликант на оглас <span style="font-weight:bold;">${pozicija}<span>.</p>
        <p>За да гo видете CV-то на апликантот ве молиме да го проверите вашиот кориснички панел
        во делот на Огласи->Мои Огласи.</p>
        
        <a href="https://bintern.com/companies/profile">Кликнете тука за да ја отворите апликацијата.</a>
        <h3>Информации за апликантот:</h3>
        <ul>
     <li>Име и Презиме: ${imePraktikant}</li>
     <li>e-mail: ${praktikantMail}</li>
     </ul>
        <p>Со почит,</p>

        <p>Тим Бинтерн
         </p>`
    }).then(res => console.log('Successfully sent that mail to a company')).catch(err => console.log(err));

    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    return {
        emailSuccessfull: 'Email has been successfully sent to a company'
    }
})

exports.sendEmailNotificationToStudentForInterview = functions.https.onCall((data, context) => {

    const firmaEmail = data.firmaEmail;
    const imePraktikant = data.imePraktikant;
    const praktikantMail = data.praktikantMail;
    const pozicija = data.pozicija;
    const imeFirma = data.imeFirma;
    const firmaTel = data.firmaTel;
    const odgLice = data.odgLice;

    let authData = nodmailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: SENDER_EMAIL,
            pass: SENDER_PASSWORD
        }
    });
    authData.sendMail({
        from: '"Bintern MK" <bintern.info@gmail.com>',
        to: `${praktikantMail}`,
        subject: `Иматe покана за интервју на огласот за ${pozicija} од ${imeFirma} `,
        text: `${praktikantMail}`,
        html: `<p>Почитуван/a ${imePraktikant},</p>

        <p>Ве известуваме дека имате покана за интервју на огласот <span style="font-weight:bold;">${pozicija}<span>.</p>
        <p>Ви честитаме што сте избрани за интервју, со среќа! Контактирајте ја компанијата уште веднаш.
        </p>
        <h3>Информации за компанијата:</h3>
        <ul>
     <li>Име: ${imeFirma}</li>
     <li>e-mail: ${firmaEmail}</li>
     <li>Kонтакт телефон: ${firmaTel}</li>
     <li>Одговорно лице: ${odgLice}</li>

     </ul>
        <p>Со почит,</p>

        <p>Тим Бинтерн
         </p>`
    }).then(res => console.log('Successfully sent that mail to a student for a interview')).catch(err => console.log(err));

    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    return {
        emailSuccessfull: 'Email has been successfully sent to a student for interview'
    }
})