import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const Signup = () => {

  const [inputs, setInputs] = useState({
    fullname: '',
    username: '',
    password: '',
    cofirmpassword: '',
    gender: ''
  })

  const { loading, signup } = useSignup()

  const handleCheckGender = (gender) => {
    setInputs({ ...inputs, gender })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(inputs)

    console.log(inputs);

  }

  return (
    <div className='flex flex-col items-center justify-center min-w96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-sm bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          SignUp
          <span className='text-blue-500'> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          
          {/* fullname */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Full Name</span>
            </label>
            <input type="text" placeholder='Enter full name' className='w-full input input-bordered h-10'
              value={inputs.fullname}
              onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
            />
          </div>

          {/* username */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Username</span>
            </label>
            <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          {/* password */}
          <div>
            <label className='label '>
              <span className='text-base label-text text-white'>Password</span>
            </label>
            <input type="password" placeholder='Enter password' className='w-full input input-bordered h-10'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          {/* confirm password */}
          <div>
            <label className='label '>
              <span className='text-base label-text text-white'>Confirm password</span>
            </label>
            <input type="password" placeholder='Enter confirm password' className='w-full input input-bordered h-10'
              value={inputs.cofirmpassword}
              onChange={(e) => setInputs({ ...inputs, cofirmpassword: e.target.value })}
            />
          </div>

          {/* Gender choice */}
          <GenderCheckbox onCheckboxChange={handleCheckGender} selectedGender={inputs.gender} />

          <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'>
            Already have an account ?
          </Link>
          <div>
            <button className='btn btn-outline btn-info btn-block btn-sm mt-2' disabled={loading}>
              {loading ? <span className='loading loading-spinner' ></span> : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup


// import React from 'react'
// import GenderCheckbox from './GenderCheckbox'

// const Signup = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-w96 mx-auto'>
//       <div className='w-full p-6 rounded-lg shadow-sm bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//         <h1 className='text-3xl font-semibold text-center text-gray-300'>
//           SignUp
//           <span className='text-blue-500'> ChatApp</span>
//         </h1>

//         <form>
//           {/* fullname */}
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>Full Name</span>
//             </label>
//             <input type="text" placeholder='Enter full name' className='w-full input input-bordered h-10' />
//           </div>
//           {/* username */}
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>Username</span>
//             </label>
//             <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10' />
//           </div>
//           {/* password */}
//           <div>
//             <label className='label '>
//               <span className='text-base label-text'>Password</span>
//             </label>
//             <input type="password" placeholder='Enter password' className='w-full input input-bordered h-10' />
//           </div>
//           {/* confirm password */}
//           <div>
//             <label className='label '>
//               <span className='text-base label-text'>Confirm password</span>
//             </label>
//             <input type="password" placeholder='Enter confirm password' className='w-full input input-bordered h-10' />
//           </div>
//           {/* Gender choice */}
//           <GenderCheckbox/>

//           <a href="#" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
//             Already have an account ?
//           </a>
//           <div>
//             <button className='btn btn-outline btn-info btn-block btn-sm mt-2'>Sign Up</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Signup
