import styles from "./Projects.module.css"

const projectList = [
  {
    name: "Weather Data (Revamped)",
    description: "Real-time weather data made with React",
    languages: ["REACT", "JSX", "JAVASCRIPT"],
    imgURL: "/IMG_0009.png",
    alt: "An image featuring LA weather on Apple Watch",
    link: "https://weather-mtkk.vercel.app"
  },
  {
    name: "Tic Tac Toe",
    description: "3x3 Classic Tic Tac Toe made with React",
    languages: ["REACT", "JSX", "JAVASCRIPT"],
    imgURL: "/tic-tac-toe.png",
    alt: "An image featuring tic-tac-toe game",
    link: "https://tic-tac-toe-mtkk.vercel.app"
  },
  {
    name: "Poured Memories, LLC",
    description: "I rebuilt my coworker’s entire business website from scratch to help her stop paying annual Squarespace subscription fees",
    languages: ["HTML", "CSS", "JAVASCRIPT"],
    imgURL: "https://images.squarespace-cdn.com/content/v1/6698834996b6057e16d61abc/1730774861151-V8RPEPNI7WUVCXAIQGT3/unsplash-image-IRzq8sDxb7w.jpg",
    alt: "A stock image of champagne being poured",
    link: "https://myatthitkoko.github.io/lvllc/"
  },
  {
    name: "Weather Data",
    description: "Real-time weather data delivered with API",
    languages: ["HTML", "CSS", "JAVASCRIPT"],
    imgURL: "/clouds.jpg",
    alt: "An image of a few clouds",
    link: "https://myatthitkoko.github.io/React/weather.html"
  },
  {
    name: "Random Jokes",
    description: "Refresh page to see jokes retrieved with API",
    languages: ["HTML", "JAVASCRIPT"],
    imgURL: "https://images.unsplash.com/photo-1641903806973-17eaf2d2634f?q=80&w=1170&auto=format&fit=crop",
    alt: "A stock image of a stage set up for a stand up comedian",
    link: "https://myatthitkoko.github.io/React/joke.html"
  },
  {
    name: "To-Do List",
    description: "A simple list for reminder",
    languages: ["HTML", "CSS", "JAVASCRIPT"],
    imgURL: "https://images.unsplash.com/photo-1598791318878-10e76d178023?q=80&w=1170&auto=format&fit=crop",
    alt: "A stock image of a list to make coffee",
    link: "https://myatthitkoko.github.io/React/toDo.html"
  },
  {
    name: "Basic Calculator",
    description: "Simple functions for a quick answer",
    languages: ["HTML", "CSS", "JAVASCRIPT"],
    imgURL: "https://images.unsplash.com/photo-1668930185267-1f3c19851b5b?q=80&w=687&auto=format&fit=crop",
    alt: "calculator with an orange background",
    link: "https://myatthitkoko.github.io/React/calculator.html"
  },
  {
    name: "Linux System Monitoring",
    description: "A system report of performance and memory usage",
    languages: ["Bash"],
    imgURL: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1074&auto=format&fit=crop",
    alt: "A stock image of linux terminal",
    link: "https://github.com/myatthitkoko/linux"
  },
  {
    name: "Stair-Climbing Robot",
    description: "The latest project of Robotics Club in college",
    languages: ["C++"],
    imgURL: "/arduino.jpeg",
    alt: "Arduino Uno Circuit",
    link: "https://github.com/myatthitkoko/robotics-club"
  },
  {
    name: "Blogs",
    description: "Read my first blog about Snap Academies",
    languages: ["HTML", "CSS"],
    imgURL: "/snap-blog-preview.png",
    alt: "A text saying Blogs",
    link: "/projects/blogs/SEA2026.html"
  },
  {
    name: "Kura Menu",
    description: "Project Assessment for an internship application",
    languages: ["HTML", "CSS", "JAVASCRIPT"],
    imgURL: "/kura-web-preview.png",
    alt: "A screenshot of website",
    link: "https://myatthitkoko.github.io/beyondProject/"
  },
  {
    name: "Happy Lemon | POS",
    description: "A Point-of-Sale interface of Happy Lemon Boba Shop",
    languages: ["Scratch"],
    imgURL: "https://images.unsplash.com/photo-1647427017067-8f33ccbae493?q=80&w=1170&auto=format&fit=crop",
    alt: "A stock photo of POS",
    link: "https://scratch.mit.edu/projects/1172813195/fullscreen/"
  },
  {
    name: "Numerical Integration",
    description: "Try out Simpson's Rule calculator!",
    languages: ["Python"],
    imgURL: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=1174&auto=format&fit=crop",
    alt: "Math Equation",
    link:
      "https://colab.research.google.com/drive/1tv0glxjDXIsSf5cnjKkE93P4HdB1HUBi#scrollTo=l85A3b3S-4PM"
  },
  {
    name: "Midnights | A Clock",
    description: "Taylor Swift themed clock made from Scratch",
    languages: ["Scratch"],
    imgURL: "/midnights-preview.png",
    alt: "A clock",
    link: "/projects/midnights/"
  }
];

const labs = [
  {
    name: "Conservation of Energy",
    labURL: "Ko_lab07_Physics101.pdf",
    course: "Physics 101"
  },
  {
    name: "Conservation of Momentum",
    labURL: "Ko_lab08_Physics101.pdf",
    course: "Physics 101"
  },
  {
    name: "Equilibrium",
    labURL: "Ko_lab10_Physics101.pdf",
    course: "Physics 101"
  },
  {
    name: "Archimedes' principle",
    labURL: "Ko_lab11_Physics101.pdf",
    course: "Physics 101"
  },
  {
    name: "Hooke's Law",
    labURL: "Ko_lab13_Physics101.pdf",
    course: "Physics 101"
  }
];


function ProjectGrid({featured}) {
  const featuredIndex = [0, 10, projectList.length-1];
  return (
    <>
      {(featured ? projectList.filter((_,i) => featuredIndex.includes(i)) : projectList
      ).map((item, i) => (
        <div className={`${styles.project} glass enlarge`} key={i}>
          <a href={item.link}>
            <img
              src={item.imgURL}
              alt={item.alt}
            />
            <figcaption>{item.name}</figcaption>
            <p>{item.description}</p>
            <div className={styles.languages}>
              {item.languages.map((langs, j) => (
                <p className="glass" key={j}>{langs}</p>
              ))}
            </div>
          </a>
        </div>
    ))}
    </>
  )
}

function LabGrid() {
  return (
    <>
      <ul className="nullifyList">
      {labs.map((paper, i) => (
        <li className={`glass enlarge shine ${styles.item}`} key={i}>
          <a href={paper.labURL}>
            <span>{paper.name}</span>
          </a>
          <span>{paper.course}</span>
        </li>
      ))}
        <br />
        <li className={styles.item} style={{ gridTemplateColumns: "1fr" }}>
          Progress comes from correcting assumptions. These labs were not always
          straightforward. See an example below.
        </li>
        <li className={`glass enlarge shine ${styles.item}`}>
          <a href="https://www.loom.com/share/2660a2779bd54824a976c4c4d83e8b07">
            <span>Team Communication - Angle Correction in Lab 10</span>
          </a>
        </li>
      </ul>
    </>
  )
}

export default function Projects() {
  return (
      <>
        <div className={styles.content}>
          <h2 id="recent">Recent Projects</h2>
          <section className={styles.cards}>
            <ProjectGrid featured={false} />
          </section>
          <h2 id="featured">Featured Projects</h2>
          <section className={styles.cards}>
            <ProjectGrid featured={true} />
          </section>
          <section id="labs" className="glass">
            <h3 style={{ marginLeft: 50 }}>Remarkable Physics labs</h3>
            <LabGrid />
          </section>
        </div>
      </>
  )
}