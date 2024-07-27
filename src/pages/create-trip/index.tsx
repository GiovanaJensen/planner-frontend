import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from '../steps/destination-and-date-step';
import { InviteGuestsStep } from '../steps/invite-guests-step';

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setisConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState([
    'giovana.fernandes@modalgr.io'
  ])

  function openGuestInput(){
    setIsGuestInputOpen(true);
  }

  function closeGuestInput(){
    setIsGuestInputOpen(false);
  }

  function openGuestModal(){
    setIsGuestModalOpen(true);
  }

  function closeGuestModal(){
    setIsGuestModalOpen(false);
  }

  function openConfirmTripModal(){
    setisConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal(){
    setisConfirmTripModalOpen(false);
  }

  function addEmailToInvite(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    if(!email){
      return;
    }

    if (emailsToInvite.includes(email)){
      return;
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])

    event.currentTarget.reset();
  }

  function removeEmailFromInvite(emailToRemove: string){
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)
    setEmailsToInvite(newEmailList);
  }

  function createTrip(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    navigate('/trips/123');
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-2'>
          <img src="./Logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        <div className='space-y-4'>
          <DestinationAndDateStep 
            isGuestInputOpen={isGuestInputOpen}
            closeGuestInput={closeGuestInput}
            openGuestInput={openGuestInput}
          />
          {isGuestInputOpen && (
            <InviteGuestsStep 
              openGuestModal={openGuestModal}
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
            />
          )}
        </div>

        <p className="text-zinc-500 text-sm">Ao planejar sua viagem pela plann.er você automaticamente concorda <br /> com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.</p>
      </div>

      {isGuestModalOpen && (
        <InviteGuestsModal 
        closeGuestModal={closeGuestModal}
        emailsToInvite={emailsToInvite}
        removeEmailFromInvite={removeEmailFromInvite}
        addEmailToInvite={addEmailToInvite}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal 
        closeConfirmTripModal={closeConfirmTripModal}
        createTrip={createTrip}
        />
      )}

    </div>
  )
}