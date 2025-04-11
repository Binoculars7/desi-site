import React from 'react'
import styles from '../style'
import { arrowUp } from '../assets'

const GetStarted = () => {
  return (
    <div className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}>
      <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}>
        <div className={`${styles.flexStart} flex-row`}>
          <p className='font-poppins font-medium text-[18px] leading-[23px] mr-2'>
            <span className='text-gradient'>Get</span>
          </p>
          <img
            src={arrowUp}
            alt='arrow'
            className='w-[23px] h-[23px] object-contain'
          />
        </div>
        <div className="flex flex-row md:mt-0 mt-6">
  <h1 className="made-by-coneiz">Made by Coneiz</h1>
</div>

      </div>
    </div>
  )
}

export default GetStarted
