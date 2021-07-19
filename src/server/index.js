const express = require('express');
const os = require('os');

const app = express();

const scheduleMap = {
    'john': {
        schedule: [
            {
                name: 'a',
                time: '8:00 am',
                type: 'New Patient'
            }
        ]
    },
    'jane': {
        schedule: [
            {
                name: 'b',
                time: '10:00 am',
                type: 'New Patient'
            }
        ]
    }
}
app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/physicians', (req, res) => res.send({ physicians: ['john', 'jane'] }));

app.get('/api/:name/schedule', (req, res) => res.send({ schedule: scheduleMap[req.params.name].schedule }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
