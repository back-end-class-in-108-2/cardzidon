const express = require('express');
const app = express();
const request = require('request');
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];
const wait = (ms) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

const TimeJob = async (ms) => {
    await wait(ms);
    return ms;
}
app.post('/api/courses', (req, res) => {
    const time = Math.random() * 10;
    const time_miles = Math.round(time * 1000);
    let course = {
        id: courses.length + 1,
        name: 'course' + (courses.length + 1),
    }
    courses.push(course);
    TimeJob(time_miles)
        .then((result) => {
            console.log('test time:' + result + 'ms');
            res.status(201).send('Successfully established');
        });
});


app.get('/', (req, res) => {
    console.log('index');
    res.send('index');
});

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(
        courses => courses.id === parseInt(req.params.id)
    );
    res.send(course);
});

app.listen(3000, () => {
    console.log('My Node is listening on port 3000!');
}); 