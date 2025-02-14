import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-24">Meet Our Team</h1>
        
        {/* Bikash's Section */}
        <div className="mb-32">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-blue-500 mb-4">Bikash Lenka</h2>
                <h3 className="text-2xl text-gray-400">Product Architect and Marketing Lead of RivieraInfo</h3>
              </div>
              
              {/* Mobile Image */}
              <div className="md:hidden relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-8">
                <Image 
                  src="/bikash.jpeg" 
                  alt="Bikash Lenka"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>Social Impact Entrepreneur | Innovator | Student Leader | mindfulness practitioner 🧘‍♂️</p>
                <p>I am an entrepreneur and student focused on creating frugal ♻️ and innovative solutions 🪔 in education, environment, health and wellness, and medical sectors. I lead several student initiatives promoting sustainability and social entrepreneurship, with one project progressing to an MoU with a university, currently in the paperwork phase.</p>
                <p>I excel in team building 👥 to foster collaboration, business negotiation 💼 to secure strategic partnerships, and public speaking 🎤 to engage and inspire audiences. Skilled in risk management, I anticipate challenges and develop strategies to ensure project success.</p>
                <p>Believing in the power of collaboration, I am eager to connect with like-minded innovators to expand my network.</p>
                <div className="mt-4">
                  <p className="text-lg font-semibold mb-2">I am specially looking forward to connect with:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Video Editors</li>
                    <li>Community Builders</li>
                    <li>Developers</li>
                    <li>Marketing and outreach</li>
                    <li>Social Leaders</li>
                    <li>Corporate lawyers</li>
                  </ul>
                </div>
              </div>
              <div className="pt-6 flex gap-4">
                <Link 
                  href="https://www.linkedin.com/in/bikash-lenka/" 
                  target="_blank"
                  className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full transition-colors text-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  Connect on LinkedIn
                </Link>
                <Link 
                  href="https://formai-cx8m.vercel.app/public/submit-form/98a9e837-4845-4497-8036-350329bbda5e"
                  target="_blank"
                  className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full transition-colors text-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Contact Form
                </Link>
              </div>
            </div>
            {/* Desktop Image */}
            <div className="hidden md:block relative w-full aspect-[4/5] rounded-xl overflow-hidden">
              <Image 
                src="/bikash.jpeg" 
                alt="Bikash Lenka"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Karthik's Section - Similar structure with reversed order */}
        <div className="mb-32">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Desktop Image */}
            <div className="hidden md:block relative w-full aspect-[4/5] rounded-xl overflow-hidden">
              <Image 
                src="/karthik-min.jpeg" 
                alt="Karthik Nadar"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-blue-500 mb-4">Karthik Nadar</h2>
                <h3 className="text-2xl text-gray-400">Tech Lead and Full-Stack Developer of RivieraInfo</h3>
              </div>
              
              {/* Mobile Image */}
              <div className="md:hidden relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-8">
                <Image 
                  src="/karthik-min.jpeg" 
                  alt="Karthik Nadar"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>I'm a Cloud & DevOps Engineer and Full-Stack Developer passionate about building scalable infrastructures and pushing the boundaries of machine learning. I specialize in backend development with Express.js, FastAPI, and Python, seamlessly integrating React and Next.js for dynamic user experiences.</p>
                
                <p>With hands-on experience in AWS (EC2, VPC, EKS, S3), I focus on containerization with Docker and orchestration using Kubernetes, ensuring scalable and efficient applications. I take pride in automating deployments through CI/CD pipelines using Jenkins and GitHub Actions.</p>
                
                <p>Beyond infrastructure, I'm deeply invested in deep learning and generative AI, fine-tuning Stable Diffusion models and exploring GANs, VAEs, and diffusion models. My expertise lies in text-to-image transformations, optimizing models with LoRA and DreamBooth to enhance AI-generated visuals.</p>
              </div>
              <div className="flex gap-4 pt-6">
                <Link 
                  href="https://github.com/karthiknadar1204" 
                  target="_blank"
                  className="inline-flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-full transition-colors text-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </Link>
                <Link 
                  href="https://www.linkedin.com/in/karthik-nadar-b2155a25b/" 
                  target="_blank"
                  className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full transition-colors text-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center border-t border-gray-800 pt-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">Special Thanks</h2>
          <div className="text-lg text-gray-300">
            <p className="mb-4">We extend our heartfelt gratitude to:</p>
            <p>
              <Link
                href="https://docs.google.com/document/d/1Lva99efg5eIM92q9tiLwf8xaNuV4ndPS7JnC6yTTcvU/edit"
                target="_blank"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Click here to learn more about our team and contributors
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 