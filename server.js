import http from 'http';
import url from 'url'

const listStudent = [
    {
        id: 1,
        fullName: "Jackie",
        age: 5,
        class: "5A"
    },
    {
        id: 2,
        fullName: "Juli MTP",
        age: 5,
        class: "5A"
    },
    {
        id: 3,
        fullName: "Denis",
        age: 51,
        class: "5B"
    },
]

const app = http.createServer((request, response) => {
    // 2 cái path tới cái route xử lý yêu CẦU
    // mỗi route nó sẽ mapping với logic xử lý tương ứng
    // routing đi tìm logic code phù hợp với PATH (đường dẫn)

    const urlParsed = url.parse(request.url, true)

    
    if (urlParsed.pathname === "/users") {
        response
            .writeHead(200, { 'Content-Type': 'application/json' })
            .end(JSON.stringify(listStudent));
    } else if (urlParsed.pathname === "/users/old") {
        const listOldUsers = listStudent.filter(user => user.age >= 50)
        return response
            .writeHead(200, { 'Content-Type': 'application/json' })
            .end(JSON.stringify(listOldUsers));
    } else if (urlParsed.pathname === "/users/add-random") {
        const studentInfo = urlParsed.query
        listStudent.push(studentInfo)
        return response
            .writeHead(200, { 'Content-Type': 'application/json' })
            .end(JSON.stringify(listStudent));
    } else if (urlParsed.pathname === "/users/add") {
        const studentInfo = urlParsed.query

        listStudent.push({
            id: studentInfo.id,
            fullName: studentInfo.fullName,
            age: studentInfo.age,
            class: studentInfo.class
        })

        response
            .writeHead(200, { 'Content-Type': 'application/json' })
            .end(JSON.stringify(listStudent));
    } else if (urlParsed.pathname === "/users/update") {
        const studentInfo = urlParsed.query

        const user = listStudent.filter(user => user.id === +studentInfo.id)[0]

        if (user === undefined || user === null) {
            return response
                .writeHead(400, {})
                .end("Invalid user id: " + studentInfo.id)
        }


        if (studentInfo.fullName !== undefined && studentInfo.fullName !== null) {
            user.fullName = studentInfo.fullName
        }
        if (studentInfo.age !== undefined && studentInfo.age !== null) {
            user.age = studentInfo.age
        }
        if (studentInfo.class !== undefined && studentInfo.class !== null) {
            user.class = studentInfo.class
        }

        return response
            .writeHead(200, { 'Content-Type': 'application/json' })
            .end(JSON.stringify(user));
    }
});

app.listen(8080, () => {
    console.log('Server is running!');
});