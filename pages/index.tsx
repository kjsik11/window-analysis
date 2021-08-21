/**
 * @template PageComponent
 */
 import { useEffect } from 'react';
 import router from 'next/router';
 
 import { useSession } from '@lib/hooks/use-session';
 import { Button, Link } from '@components/ui';
 import Loading from '@components/core/Loading';
 
 export default function IndexPage() {
   const { user, loading } = useSession();
 
   useEffect(() => {
     if (user) router.replace('/home');
   }, [user]);
 
   if (loading) return <Loading />;
 
   return (
     <div className="flex justify-center">
       <header className="sticky top-0 z-20 h-16 w-full bg-gray-200 shadow-md">
         <div className="flex justify-between px-8 items-center h-full">
           <p>LOGO</p>
           <Link href="/signin">
             <Button>Login</Button>
           </Link>
         </div>
       </header>
     </div>
   );
 }