import {MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User, Mail} from 'lucide-react';
import { FormEvent, useState } from 'react';

export function App() {
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

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-2'>
          <img src="./Logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        <div className='space-y-4'>
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className='flex items-center gap-2 flex-1'>
              <MapPin className="size-5 text-zinc-400"/>
              <input disabled={isGuestInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
            </div>
            <div className='flex items-center gap-2'>
              <Calendar className="size-5 text-zinc-400"/>
              <input disabled={isGuestInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"/>
            </div>

            <div className='w-px h-6 bg-zinc-800'></div>

            {isGuestInputOpen ? (
              <button onClick={closeGuestInput} className='bg-zinc-800 text-zinc-200 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-zinc-700'>
                Alterar
                <Settings2 className='size-5'/>
              </button>
            ) : 
              <button onClick={openGuestInput} className='bg-lime-300 text-lime-950 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-lime-400'>
                Continuar
                <ArrowRight className='size-5'/>
              </button>
            }
          </div>

          {isGuestInputOpen && (
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <button onClick={openGuestModal} type='button' className='flex items-center gap-2 flex-1'>
              <UserRoundPlus className="size-5 text-zinc-400"/>
              <span className='text-zinc-400 text-lg flex-1 text-left'>Quem estará na viagem?</span>
            </button>

            <div className='w-px h-6 bg-zinc-800'></div>

            <button onClick={openGuestInput} className='bg-lime-300 text-lime-950 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-lime-400'>
              Confirmar viagem   
              <ArrowRight className='size-5'/>
            </button>
          </div>
          )}
        </div>

        <p className="text-zinc-500 text-sm">Ao planejar sua viagem pela plann.er você automaticamente concorda <br /> com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.</p>
      </div>

      {isGuestModalOpen && (
        <div className='fixed insert-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className="flex items-center justify-between">
              <h2 className='text-lg font-semibold'>Selecionar convidados</h2>
                <button type='button' onClick={closeGuestModal}>
                  <X className='size-5 text-zinc-600'/>
                </button>
              </div>
              <p className='text-sm text-zinc-400'>Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
            </div>
            <div className='flex flex-wrap gap-2'>
              {emailsToInvite.map(email => {
                return (
                  <div key={email} className='px-2.5 py-1.5 bg-zinc-800 rounded-md flex items-center gap-2'>
                    <span className='text-zinc-300'>
                    {email}
                    </span>
                    <button type="button" onClick={() => removeEmailFromInvite(email)} >
                      <X className='size-4 text-zinc-400'/>
                    </button>
                  </div>
                )
              })}
            </div>
            <div className='w-full h-px bg-zinc-800'/>
            <form onSubmit={addEmailToInvite} className='p-3 bg-zinc-950 border-zinc-800 rounded-lg flex items-center'>
              <div className='px-2 flex items-center gap-2 flex-1'>
                <AtSign className='size-5 text-zinc-400'/>
                <input type="email" name='email' placeholder='Digite o e-mail do convidado' className='bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1'/>
              </div>

              <button type='submit' onClick={openConfirmTripModal} className='bg-lime-300 text-lime-950 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-lime-400'>
                Convidar
                <Plus className='size-5'/>
              </button>
            </form>
          </div>
        </div>
      )}

      {isConfirmTripModalOpen && (
        <div></div>
      )}

      <div className='fixed insert-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className="flex items-center justify-between">
              <h2 className='text-lg font-semibold'>Confirmar criação da viagem</h2>
                <button type='button' onClick={closeConfirmTripModal}>
                  <X className='size-5 text-zinc-600'/>
                </button>
              </div>
              <p className='text-sm text-zinc-400'>Para concluir a criação da viagem para <span className='text-semibold text-zinc-100'>Florianópolis, Brasil</span> nas datas de <span className='text-semibold text-zinc-100'>16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</p>
            </div>
            <form onSubmit={addEmailToInvite} className='space-y-3'>
              <div className='h-14 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                <User className='size-5 text-zinc-400'/>
                <input type="text" name='nome-completo' placeholder='Seu nome completo' className='bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1'/>
              </div>
              <div className='h-14 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                <Mail className='size-5 text-zinc-400'/>
                <input type="email" name='email' placeholder='Seu email pessoal' className='bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1'/>
              </div>
              <button type='submit' className='bg-lime-300 text-lime-950 w-full justify-center h-11 rounded-lg font-medium flex items-center gap-2 hover:bg-lime-400'>
              Confirmar criação da viagem
              </button>
            </form>
          </div>
        </div>
    </div>
  )
}