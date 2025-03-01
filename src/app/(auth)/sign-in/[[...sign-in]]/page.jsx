import { SignIn } from "@clerk/nextjs";

function Page() {
  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('https://images.pexels.com/photos/5466793/pexels-photo-5466793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
    >
      <div className="">
        <SignIn />
      </div>
    </div>
  );
}

export default Page;