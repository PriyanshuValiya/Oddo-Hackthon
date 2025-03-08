import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const teamMembers = [
    {
      name: "Priyanshu Valiya",
      linkedin: "https://linkedin.com/in/priyanshuvaliya",
      email: "priyanshu@gmail.com",
      github: "github.com/priyanshuvaliya",
    },
    {
      name: "Ashok Suthar",
      linkedin: "https://linkedin.com/in/ashoksuthar",
      email: "ashok@gmail.com",
      github: "github.com/priyanshuvaliya",
    },
    {
      name: "Vasu Vaghasia",
      linkedin: "https://linkedin.com/in/johndoe",
      email: "vasu@gmail.com",
      github: "github.com/priyanshuvaliya",
    },
    {
      name: "Veer Patel",
      linkedin: "https://linkedin.com/in/janesmith",
      email: "veer@gmail.com",
      github: "github.com/priyanshuvaliya",
    },
  ];

  return (
    <footer className="bg-black text-white p-6 text-center">
      <h2 className="font-mono text-3xl font-semibold mb-4">
        Oddo x Charusat Hackathon&lsquo;25
      </h2>
      <h2 className="font-mono text-xl font-semibold mb-4">Team : Bashboats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="p-4 border border-gray-600 rounded-lg">
            <h3 className="font-mono text-lg font-medium">{member.name}</h3>
            <div className="flex justify-between w-full mt-7">
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin />
              </Link>
              <Link
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
              </Link>
              <Link href={`mailto:${member.email}`}>
                <Mail />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-gray-500">
        &copy; {new Date().getFullYear()} Team Innovators. All rights reserved.
      </p>
    </footer >
  );
};

export default Footer;
