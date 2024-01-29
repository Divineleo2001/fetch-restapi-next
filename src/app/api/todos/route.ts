

let authToken = {id_token : ""}


export const id = 10;
console.log(authToken.id_token)

export const bearerToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTcwNjU5MzQzN30.cbgjrPDRlakh7tW8X-fYUKYyNxnWxBB-ywC54wLbfmhMcqyGDcb1KLykckOOFlgf0ECPJWk5k1dt2JkgaGu88Q"
export const base_url = "http://localhost:8080/api"
export const auth_url = `${base_url}/authenticate`
export const patient_url = `${base_url}/patients`
export const p_id_url = `${patient_url}/${id}`
// console.log(auth_url)


export async function GET(request: Request) {

  try {
    const res = await fetch(patient_url, {
      method: "GET",
      headers: {
        "accept": "*/*",
        "Authorization": `Bearer ${authToken.id_token || bearerToken} }`,
        "Content-Type" : "application/json"
      }
    })

    if (res.ok) {
      const todos = await res.json();
      console.log(todos)
      return Response.json({todos} );
    } else {
      console.log(`HTTP error! Status: ${res.status}`);
    } 
  } catch (error) {
    // console.error("Error fetching data:", error.message);
  }

  // try{
  //   const res = await fetch(patient_url, {
  //     headers: {
  //       Authorization: `Bearer ${authToken.id_token}`,
  //     },
  //   });
  // }

  // return Response.json({message:"Hello ! World"})
  // const res = await fetch(patient_url, {
  //   headers: {
  //     Authorization: `Bearer ${authToken.id_token}`,
  //   },
  // });
  // const todos = await res.json();
  // const todos = await res.json();
  // return Response.json({ todos });
  // const newTodos = [{ id: 0, title: "Get request demo" }, ...todos];

  // return Response.json({ todos: newTodos });
}

export async function POST(request: Request) {

    const adminLogin = {
        "username": "admin",
        "password" : "admin",
        "rememberMe": true
    }
  const res = await fetch( auth_url,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(adminLogin),
  });
  const todos = await res.json();
  console.log(todos)

  authToken = todos
  console.log(`this is a successful token save = ${authToken}`)
  console.log(todos.id_token)



//   const newTodos = [{ id: 0, title: "post request demo" }, ...todos];
  return Response.json({ todos });
}


console.log(`the state of the auth token can be accessed outside of the function = ${authToken}`)