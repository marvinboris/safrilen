import { CalendarDaysIcon } from "@heroicons/react/24/outline";

import { classNames } from "../../../../app/helpers/utils";
import TicketType from "../../../../app/types/ticket";

export default function TicketCard({ draw, expiry, num, status, target }: TicketType) {
    return <div className={classNames(status === 'won' || status === 'claimed' ? "border-green" : "border-blue", "bg-white rounded-[18.956px] pt-[17.16px] md:pt-[13.9px] pl-[22.22px] md:pl-[18.32px] pb-[16.56px] md:pb-[13.91px] pr-[27.02px] md:pr-[9.59px] border-[1.26px] flex")}>
        <div className="flex-1">
            <div className="font-bold text-[14.04px] md:text-[11.37px] mb-[4.04px] md:mb-[3.06px]">{num}</div>
            <div className={classNames(status === 'won' ? "text-green bg-green/10 font-bold" : status === 'claimed' ? "text-red bg-red/10 font-bold" : "bg-blue/10", status === 'pending' ? "text-blue" : "", 'py-1 w-[104.26px] h-[21.06px] md:h-[17.26px] rounded-[3.79121px] inline-flex items-center justify-center text-[9.36px] md:text-[7.58px] mb-[6.32px]')}>
                {status === 'won' ? "You Won !!!" :
                    status === 'claimed' ? "Already Claimed" :
                        status === 'pending' || status === 'incoming' ? <div className='font-medium'>
                            <span className="mr-[3.79px]">
                                <div className="inline-block w-[7px] h-[7px] rounded-full border-blue border border-t-transparent animate-spin" />
                            </span> Pending draw
                        </div> : <div className='font-medium'>
                            <span className="mr-[3.79px]">
                                <CalendarDaysIcon className="inline-block w-[5.69px]" />
                            </span> Draw Date : {draw.toLocaleDateString()}
                        </div>}
            </div>
            <div className={classNames(status === 'won' ? "bg-green text-white" : "relative text-green", "h-[34.32px] md:h-[27.8px] font-bold rounded-[5.05494px] text-[12.34px] md:text-[10px] overflow-hidden mb-[14.46px] md:mb-[12.3px] flex items-center justify-center")}>
                {status === 'won' ? <span>
                    Claim your prize !!!
                </span> : status === 'claimed' ? <>
                    <img src='/images/backend/claimed-ticket.svg' alt='BG Pending ticket' className='image-cover absolute z-0' />
                    <span className="z-10">Not available</span>
                </> : <>
                    <img src='/images/backend/pending-ticket.svg' alt='BG Pending ticket' className='image-cover absolute z-0' />
                    <img src='/images/logo.svg' alt='Logo' className='h-full w-auto z-10' />
                </>}
            </div>
            <div className="text-[12.48px] md:text-[10.11px]">
                {status === 'won' || status === 'claimed' ? <>
                    <span className="font-bold">Expiry :</span> {expiry?.toLocaleDateString()}
                </> : <>
                    <span className="font-bold">Target :</span> {target} / 1000
                </>}
            </div>
        </div>

        <div className="ml-12 md:ml-[15.8px] pt-[4.42px]">
            <img src={`/images/backend/${status === 'won' || status === 'claimed' ? "qr-green.svg" : "qr-blue.svg"}`} alt="QR code" className="w-20 md:w-[65.6px] h-auto" />
        </div>
    </div>
}