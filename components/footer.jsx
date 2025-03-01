import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const teamMembers = [
    {
      name: "Priyanshu Valiya",
      linkedin: "https://www.linkedin.com/in/priyanshu-valiya19012006",
      email: "valiyapriyansukumar@gmail.com",
      github: "https://github.com/PriyanshuValiya"
    },
    {
      name: "Ashok Suthar",
      linkedin: "https://www.linkedin.com/in/ashok-suthar-ba9699284",
      email: "ashoksutharr4412@gmail.com",
      github: "https://github.com/PriyanshuValiya"
    },
    {
      name: "Vasu Vaghasia",
      linkedin: "https://www.linkedin.com/in/vasu-vaghasia-6b1ab0282",
      email: "vasuvaghasia005@gmail.com",
      github: "https://github.com/PriyanshuValiya"
    },
    {
      name: "Veer Patel",
      linkedin: "https://www.linkedin.com/in/veer-patel-4a088528b",
      email: "patelveer@gmail.com",
      github: "https://github.com/PriyanshuValiya"
    },
  ];

  return (
    <footer className="bg-black text-white p-6 text-center">
      <h2 className="font-mono text-3xl font-semibold mb-4">
        Oddo x Charusat Hackathon&apos;25
      </h2>
      <h2 className="font-mono text-xl font-semibold mb-4">Team : Bashboats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="p-4 border border-gray-600 rounded-lg">
            <h3 className="font-mono text-lg font-medium">{member.name.replace("'", "&rsquo;")}</h3>
            
            <div className="flex justify-around mt-7">
                <Link href={member.linkedin} target="_blank"><Linkedin /></Link>
                <Link href={member.github} target="_blank"><Github /></Link>
                <Link href={member.email} target="_blank"><Mail /></Link>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-gray-500">
        &copy; {new Date().getFullYear()} Team Innovators&#39; All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
