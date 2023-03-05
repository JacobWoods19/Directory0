import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { ToastContainer, toast } from 'react-toastify';


const emailSent = () => toast('Email sent! Check your inbox.');
const emailNotSent = () => toast('Email not sent! Please try again.');
const noEmail = () => toast('Hey! You need to enter an email address. ');

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  
  const handleLogin = async (email) => {
    if (email.length === 0){
        noEmail()
        return
    }
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      emailSent()
    } catch (error) {
      emailNotSent()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
    <ToastContainer />
    <div className="bg-gray-900 flex flex-col items-center justify-center mx-auto h-screen ">
      <div className="shadow">
        <div className="w-full p-5 bg-white rounded-lg shadow-lg dark:border   bg-gray-200 ">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-800 md:text-2xl text-slate-800">Magic Link Sign In</h1>
        <p className="description pb-5">We'll send a one click sign-in straight to your email. </p>
        <div>
          <input
            className="inputField text-slate-800 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="email"
            placeholder="Your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)
            }
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
              emailSent()
            }}
            className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? <span>Loading</span> : <span>Send magic link</span>}
          </button>
          </div>
        </div>
      </div>

    </div>
    </div>
  )
}
