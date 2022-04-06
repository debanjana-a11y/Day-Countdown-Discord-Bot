// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.1'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: 'Wait ! Let me calculate ...'
});

let day_count = await lib.googlesheets.query['@0.3.0'].select({
  range: `A1:A13`,
  bounds: 'FIRST_EMPTY_ROW',
  where: [{}],
  limit: {
    'count': 12,
    'offset': 0
  }
});

function isLeapY(year) {
  if (year%400 == 0) {
    return true
  }
  if (year%100 != 0 && year %4 == 0) {
    return true
  }
  return false
}

let date = new Date()
let curr_day = date.getDate()
let curr_month = date.getMonth() + 1
let curr_year = date.getFullYear()
let total_days = day_count.rows[curr_month-1].fields['Day Count']
let total_months = 12
// If month is february then check if year is a leap year
if (curr_month == 1 &&  isLeapY(curr_year)) {
  total_days += 1;
}

let rem_days = total_days - curr_day
let rem_month = total_months - curr_month

await lib.discord.channels['@0.3.1'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `Here you are`,
  tts: false,
  embeds: [
    {
      "fields": [
        {
          "name": "Date Today",
          "value": curr_day + '/' + curr_month + '/' + curr_year
        },
        {
          "name": "Remaining Days in This Month",
          "value": rem_days
        },
        {
          "name": "Remaining Months in This Year",
          "value": rem_month
        },
      ]
    }
  ]
});






