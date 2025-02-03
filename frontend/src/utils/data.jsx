const student = [
  { "id": "S001", "email": "student1@example.com", "password": "pass1234" },
  { "id": "S002", "email": "student2@example.com", "password": "pass2345" },
  { "id": "S003", "email": "student3@example.com", "password": "pass3456" },
  { "id": "S004", "email": "student4@example.com", "password": "pass4567" },
  { "id": "S005", "email": "student5@example.com", "password": "pass5678" },
  { "id": "S006", "email": "student6@example.com", "password": "pass6789" },
  { "id": "S007", "email": "student7@example.com", "password": "pass7890" },
  { "id": "S008", "email": "student8@example.com", "password": "pass8901" },
  { "id": "S009", "email": "student9@example.com", "password": "pass9012" },
  { "id": "S010", "email": "student10@example.com", "password": "pass0123" }
]

const mentor = [
  { "id": "M001", "email": "mentor1@example.com", "password": "mentor1234" },
  { "id": "M002", "email": "mentor2@example.com", "password": "mentor2345" },
  { "id": "M003", "email": "mentor3@example.com", "password": "mentor3456" },
  { "id": "M004", "email": "mentor4@example.com", "password": "mentor4567" },
  { "id": "M005", "email": "mentor5@example.com", "password": "mentor5678" }
]

export const setLocalStorage = ()=>{
  localStorage.setItem('student', JSON.stringify(student))
  localStorage.setItem('mentor', JSON.stringify(mentor))
}
export const getLocalStorage = ()=>{
  const student = JSON.parse(localStorage.getItem('student'))
  const mentor = JSON.parse(localStorage.getItem('mentor'))

  return {student, mentor}
}