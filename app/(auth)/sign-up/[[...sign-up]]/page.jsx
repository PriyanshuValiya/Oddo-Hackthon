import { SignUp } from "@clerk/nextjs";

function Page() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center w-full "
      style={{ backgroundImage: "url('https://images.pexels.com/photos/6928994/pexels-photo-6928994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
    >
      
      {/* Sign-in Card (Centered & Styled) */}
      <div >
        <SignUp />
      </div>
    </div>
  );
}

export default Page;
