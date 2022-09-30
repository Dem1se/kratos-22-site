let apiOrigin = 'https://api.kratos23.com'
// let apiOrigin = 'http://localhost:3555'

$('body').ready(async function () {
  let res = await axios.get(apiOrigin + '/retrieve');
  console.log(res.data);
  let forms = res.data;

  for (let i = 0; i < forms.length; i++) {
    let tl = forms[i].team_events.length
    let teamEvents = forms[i].team_events.map((x, j, a) => `
      ${j == 0
        ? `<td>${x}</td> 
           <td>${forms[i][x].full_name}, ${forms[i][x].member1_full_name || '_'}, ${forms[i][x].member2_full_name || '_'}, ${forms[i][x].member3_full_name || '_'}</td>`
        : `<tr>
            <td>${x}</td>
            <td>${forms[i][x].full_name}, ${forms[i][x].member1_full_name || '_'}, ${forms[i][x].member2_full_name || '_'}, ${forms[i][x].member3_full_name || '_'}</td>
          </tr>`}
    `)

    $('#tbody').append(`
      <tr colspan="${tl}">
        <td rowspan="${tl}">${forms[i].full_name}</td>
        <td rowspan="${tl}">${forms[i].college_name}</td>
        <td rowspan="${tl}">${forms[i].email}</td>
        <td rowspan="${tl}">${forms[i].mobile}</td>
        <td rowspan="${tl}">${forms[i].screenshot
        ? `<a href="${forms[i].screenshot}"target="_blank" rel="noopener noreferrer">Link</a></td>`
        : 'none'
      }
        <td rowspan="${tl}">${forms[i].solo_events.length == 0
        ? 'none'
        : forms[i].solo_events
      }</td>
        
        ${teamEvents}
      </tr>
    `)
  }
});