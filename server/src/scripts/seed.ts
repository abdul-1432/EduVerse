import mongoose from 'mongoose';
import { Quiz } from '../models/Quiz.js';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/eduverse';
  await mongoose.connect(uri);

  await Quiz.deleteMany({});
  await Quiz.create([
    // Schooling Class 1 (12+ questions)
    {
      title: 'Math: Mixed Practice (Class 1)',
      description: 'Basic addition/subtraction (within 20) and comparisons',
      group: 'Schooling', subgroup: 'Class 1', difficulty: 'easy',
      questions: [
        { text: '2 + 3 = ?', options: ['4','5','6','7'], correctIndex: 1 },
        { text: '5 - 2 = ?', options: ['1','2','3','4'], correctIndex: 2 },
        { text: '8 + 1 = ?', options: ['7','8','9','10'], correctIndex: 2 },
        { text: '10 - 4 = ?', options: ['4','5','6','7'], correctIndex: 1 },
        { text: 'Which is bigger?', options: ['3','7'], correctIndex: 1 },
        { text: '6 + 6 = ?', options: ['10','11','12','13'], correctIndex: 2 },
        { text: '9 - 3 = ?', options: ['5','6','7','8'], correctIndex: 1 },
        { text: '1 + 1 = ?', options: ['1','2','3','4'], correctIndex: 1 },
        { text: '7 + 2 = ?', options: ['8','9','10','11'], correctIndex: 1 },
        { text: '5 + 5 = ?', options: ['8','9','10','11'], correctIndex: 2 },
        { text: '12 - 2 = ?', options: ['8','9','10','11'], correctIndex: 3 },
        { text: '3 + 4 = ?', options: ['6','7','8','9'], correctIndex: 1 },
      ],
      xpReward: 40,
      badgeReward: 'Math Starter',
    },
    // Schooling Class 5
    {
      title: 'Science: Living vs Non-living',
      description: 'Basics of living things',
      group: 'Schooling', subgroup: 'Class 5', difficulty: 'easy',
      questions: [
        { text: 'Is a rock living?', options: ['Yes','No'], correctIndex: 1 },
        { text: 'Plants are living things.', options: ['True','False'], correctIndex: 0 },
      ],
      xpReward: 10,
      badgeReward: 'Science Starter',
    },

    // High School 11-12
    {
      title: 'Physics: Kinematics',
      description: 'Basic motion equations',
      group: 'HighSchool', subgroup: '11-12', difficulty: 'medium',
      questions: [
        { text: 'Unit of acceleration?', options: ['m/s','m/s^2','N','J'], correctIndex: 1 },
        { text: 'v = u + at is?', options: ['Newton law','Kinematics eqn','Bernoulli','Hooke'], correctIndex: 1 },
      ],
      xpReward: 25,
      badgeReward: 'Physics Apprentice',
    },

    // Graduates - General Aptitude
    {
      title: 'Aptitude: Percentage',
      description: 'Calculate simple percentages',
      group: 'General', subgroup: 'Aptitude', difficulty: 'medium',
      questions: [
        { text: 'What is 20% of 250?', options: ['25','40','50','60'], correctIndex: 1 },
        { text: 'Increase 200 by 15%', options: ['215','220','230','245'], correctIndex: 2 },
      ],
      xpReward: 30,
      badgeReward: 'Aptitude Starter',
    },

    // Engineering - CSE
    {
      title: 'CSE: Data Structures',
      description: 'Stacks and Queues',
      group: 'Engineering', subgroup: 'CSE', difficulty: 'medium',
      questions: [
        { text: 'Stack is?', options: ['FIFO','LIFO','Random','Tree'], correctIndex: 1 },
        { text: 'Queue is?', options: ['LIFO','FIFO','DFS','BFS'], correctIndex: 1 },
      ],
      xpReward: 35,
      badgeReward: 'DS Beginner',
    },

    // Engineering - ECE
    {
      title: 'ECE: Signals Basics',
      description: 'Analog vs Digital',
      group: 'Engineering', subgroup: 'ECE', difficulty: 'easy',
      questions: [
        { text: 'Digital signal values are?', options: ['Continuous','Discrete','Random','None'], correctIndex: 1 },
        { text: 'Analog signals are?', options: ['Discrete','Continuous'], correctIndex: 1 },
      ],
      xpReward: 20,
      badgeReward: 'ECE Starter',
    },

    // Medic - MBBS
    {
      title: 'MBBS: Anatomy Basics',
      description: 'Human organ systems',
      group: 'Medic', subgroup: 'MBBS', difficulty: 'easy',
      questions: [
        { text: 'Heart has how many chambers?', options: ['2','3','4','5'], correctIndex: 2 },
        { text: 'Largest organ?', options: ['Liver','Brain','Skin','Heart'], correctIndex: 2 },
      ],
      xpReward: 25,
      badgeReward: 'Anatomy Novice',
    },
    ,
    // Schooling Class 2 - English Basics (12)
    {
      title: 'English: Basics (Class 2)',
      description: 'Simple grammar and vocabulary',
      group: 'Schooling', subgroup: 'Class 2', difficulty: 'easy',
      questions: [
        { text: 'Choose the vowel:', options: ['b','c','a','d'], correctIndex: 2 },
        { text: 'Plural of “cat” is?', options: ['cats','catz','cates','cat'], correctIndex: 0 },
        { text: 'Fill in: She __ a book.', options: ['reads','read','reading','reader'], correctIndex: 0 },
        { text: 'Opposite of “hot”', options: ['warm','cold','cool','heat'], correctIndex: 1 },
        { text: 'Choose noun:', options: ['run','happy','table','quickly'], correctIndex: 2 },
        { text: 'Which is a color?', options: ['dog','blue','milk','walk'], correctIndex: 1 },
        { text: 'Fill in: I __ to school.', options: ['go','goes','going','gone'], correctIndex: 0 },
        { text: 'Past of “play”', options: ['played','plays','playing','player'], correctIndex: 0 },
        { text: 'Choose verb:', options: ['apple','jump','beautiful','green'], correctIndex: 1 },
        { text: 'Pronoun for “Riya and I”', options: ['she','he','we','they'], correctIndex: 2 },
        { text: 'Animal that barks:', options: ['cat','cow','dog','goat'], correctIndex: 2 },
        { text: 'Choose article for “__ umbrella”', options: ['a','an','the','no article'], correctIndex: 1 },
      ],
      xpReward: 35,
      badgeReward: 'English Starter',
    },

    // Schooling Class 3 - EVS (12)
    {
      title: 'EVS: Our Surroundings (Class 3)',
      description: 'Basics of environment',
      group: 'Schooling', subgroup: 'Class 3', difficulty: 'easy',
      questions: [
        { text: 'Trees give us?', options: ['oxygen','plastic','coal','iron'], correctIndex: 0 },
        { text: 'Sun rises in the?', options: ['North','South','East','West'], correctIndex: 2 },
        { text: 'We should __ water.', options: ['waste','save','dirty','ignore'], correctIndex: 1 },
        { text: 'Which is a source of water?', options: ['lake','car','book','chair'], correctIndex: 0 },
        { text: 'Kettle boils __', options: ['water','paper','sand','wood'], correctIndex: 0 },
        { text: 'Herbivores eat?', options: ['meat','plants','both','none'], correctIndex: 1 },
        { text: 'Recycle symbol has how many arrows?', options: ['2','3','4','5'], correctIndex: 1 },
        { text: 'We breathe in?', options: ['CO2','O2','N2','H2'], correctIndex: 1 },
        { text: 'Day and night due to?', options: ['Earth rotation','Moon light','Winds','Clouds'], correctIndex: 0 },
        { text: 'Nearest star to Earth?', options: ['Sun','Sirius','Polaris','Vega'], correctIndex: 0 },
        { text: 'Safe drinking water is called?', options: ['salty','dirty','potable','fizzy'], correctIndex: 2 },
        { text: 'Reduce, Reuse, __', options: ['Refill','Return','Recycle','Repaint'], correctIndex: 2 },
      ],
      xpReward: 35,
      badgeReward: 'EVS Starter',
    },

    // Schooling Class 6 - Math (12)
    {
      title: 'Math: Fractions (Class 6)',
      description: 'Basics of fractions',
      group: 'Schooling', subgroup: 'Class 6', difficulty: 'medium',
      questions: [
        { text: 'Simplify 6/12', options: ['1/2','1/3','2/3','3/4'], correctIndex: 0 },
        { text: 'Add 1/4 + 1/4', options: ['1/2','1/4','2/4','2/8'], correctIndex: 0 },
        { text: 'Which is greater?', options: ['2/3','3/5'], correctIndex: 0 },
        { text: '1/2 of 20 =', options: ['5','10','15','20'], correctIndex: 1 },
        { text: 'Convert 0.5 to fraction', options: ['1/5','2/5','1/2','5/10'], correctIndex: 2 },
        { text: '3/4 + 1/4 =', options: ['1','1/2','3/4','2/4'], correctIndex: 0 },
        { text: 'Subtract 5/6 - 1/6', options: ['4/6','3/6','2/6','1/6'], correctIndex: 0 },
        { text: 'Equivalent of 2/3?', options: ['4/6','3/6','2/6','6/9'], correctIndex: 0 },
        { text: 'Simplify 9/12', options: ['3/4','2/3','1/3','1/4'], correctIndex: 0 },
        { text: '1/3 of 90 =', options: ['20','30','40','50'], correctIndex: 1 },
        { text: 'LCM of 3 and 4', options: ['6','8','12','24'], correctIndex: 2 },
        { text: 'GCD of 12 and 18', options: ['3','6','9','12'], correctIndex: 1 },
      ],
      xpReward: 40,
      badgeReward: 'Fractions Pro',
    },

    // HighSchool 11 Chemistry (12)
    {
      title: 'Chemistry: Atomic Structure (Class 11)',
      description: 'Basics of atomic structure',
      group: 'HighSchool', subgroup: 'Class 11', difficulty: 'medium',
      questions: [
        { text: 'Electron charge is', options: ['+1','-1','0','+2'], correctIndex: 1 },
        { text: 'Atomic number equals', options: ['protons','neutrons','electrons+neutrons','mass'], correctIndex: 0 },
        { text: 'Isotopes differ in', options: ['protons','neutrons','electrons','charge'], correctIndex: 1 },
        { text: 's-orbital shape', options: ['dumbbell','spherical','clover','linear'], correctIndex: 1 },
        { text: '1 mole equals', options: ['6.022e23','3.14','1e23','1e6'], correctIndex: 0 },
        { text: 'Orbit model by', options: ['Bohr','Rutherford','Planck','Einstein'], correctIndex: 0 },
        { text: 'p-orbital count', options: ['1','2','3','5'], correctIndex: 2 },
        { text: 'Mass number =', options: ['p + n','p - n','e + p','e + n'], correctIndex: 0 },
        { text: 'Quantum model pioneer', options: ['Dalton','Heisenberg','Curie','Newton'], correctIndex: 1 },
        { text: 'Max electrons in s-subshell', options: ['2','4','6','8'], correctIndex: 0 },
        { text: 'Aufbau relates to', options: ['filling order','valency','isotopy','bonding'], correctIndex: 0 },
        { text: 'Hund’s rule relates to', options: ['spin','mass','charge','volume'], correctIndex: 0 },
      ],
      xpReward: 45,
      badgeReward: 'Chem Starter',
    },

    // HighSchool 12 Math (12)
    {
      title: 'Math: Differentiation (Class 12)',
      description: 'Basics of derivatives',
      group: 'HighSchool', subgroup: 'Class 12', difficulty: 'hard',
      questions: [
        { text: 'd/dx (x^2) =', options: ['x','2x','x^2','2'], correctIndex: 1 },
        { text: 'd/dx (sin x) =', options: ['cos x','-cos x','sin x','-sin x'], correctIndex: 0 },
        { text: 'd/dx (e^x) =', options: ['e^x','x e^x','1','0'], correctIndex: 0 },
        { text: 'd/dx (ln x) =', options: ['1/x','x','ln x','0'], correctIndex: 0 },
        { text: 'Product rule is', options: ["u v","uv' + u'v","u+v","u/v"], correctIndex: 1 },
        { text: 'Chain rule used for', options: ['sum','product','composition','quotient'], correctIndex: 2 },
        { text: 'd/dx (tan x) =', options: ['sec^2 x','-sec^2 x','tan x','sec x'], correctIndex: 0 },
        { text: 'd/dx (x^n) =', options: ['n x^(n-1)','x^n','n x^n','1'], correctIndex: 0 },
        { text: 'Critical point where', options: ["f=0","f' = 0",'f" = 0','none'], correctIndex: 1 },
        { text: 'Maxima test uses', options: ['first derivative','second derivative','limits','integrals'], correctIndex: 1 },
        { text: 'd/dx (cos x) =', options: ['-sin x','sin x','cos x','-cos x'], correctIndex: 0 },
        { text: 'Slope of tangent is', options: ['dy/dx','dx/dy','y/x','x/y'], correctIndex: 0 },
      ],
      xpReward: 50,
      badgeReward: 'Calculus Novice',
    },

    // Engineering - EEE (12)
    {
      title: 'EEE: Circuits Basics',
      description: 'Voltage, current, resistance',
      group: 'Engineering', subgroup: 'EEE', difficulty: 'easy',
      questions: [
        { text: 'Ohm’s law is', options: ['V=IR','P=VI','I=VR','V=PI'], correctIndex: 0 },
        { text: 'Unit of resistance', options: ['Volt','Ampere','Ohm','Watt'], correctIndex: 2 },
        { text: 'Parallel resistors: total', options: ['sum','less than smallest','greater than largest','zero'], correctIndex: 1 },
        { text: 'Series resistors: total', options: ['sum','product','difference','average'], correctIndex: 0 },
        { text: 'Power formula', options: ['P=VI','P=IR','P=V/I','P=I/V'], correctIndex: 0 },
        { text: 'Capacitor stores', options: ['energy','charge','both','heat'], correctIndex: 2 },
        { text: 'Inductor stores', options: ['charge','energy in field','heat','light'], correctIndex: 1 },
        { text: 'AC frequency (India)', options: ['50 Hz','60 Hz','100 Hz','25 Hz'], correctIndex: 0 },
        { text: 'Diode conducts', options: ['both ways','one way','no way','random'], correctIndex: 1 },
        { text: 'Kirchhoff’s current law', options: ['sum currents=0','sum voltages=0','sum resistances=0','sum powers=0'], correctIndex: 0 },
        { text: 'Unit of power', options: ['Joule','Watt','Newton','Tesla'], correctIndex: 1 },
        { text: 'Transformer changes', options: ['frequency','power','voltage level','resistance'], correctIndex: 2 },
      ],
      xpReward: 35,
      badgeReward: 'Circuits Starter',
    },

    // Engineering - MEC (12)
    {
      title: 'MEC: Thermodynamics Basics',
      description: 'Zeroth, First, Second Laws',
      group: 'Engineering', subgroup: 'MEC', difficulty: 'medium',
      questions: [
        { text: 'Zeroth law defines', options: ['energy','temperature','entropy','volume'], correctIndex: 1 },
        { text: 'First law about', options: ['heat engines','energy conservation','entropy','refrigeration'], correctIndex: 1 },
        { text: 'Second law about', options: ['entropy','enthalpy','work','internal energy'], correctIndex: 0 },
        { text: 'SI unit of heat', options: ['Joule','Calorie','Watt','Newton'], correctIndex: 0 },
        { text: 'Cp - Cv equals', options: ['R','0','k','n'], correctIndex: 0 },
        { text: 'Ideal gas eqn', options: ['PV=nRT','PV=RT','P+V=RT','PV=nR/T'], correctIndex: 0 },
        { text: 'Isothermal means', options: ['const T','const P','const V','const S'], correctIndex: 0 },
        { text: 'Adiabatic means', options: ['no heat transfer','no work','no mass','no volume'], correctIndex: 0 },
        { text: 'Carnot efficiency increases with', options: ['higher Tc','lower Th','higher Th - lower Tc','random'], correctIndex: 2 },
        { text: 'Work in expansion is', options: ['positive','negative','zero','random'], correctIndex: 0 },
        { text: 'Entropy unit', options: ['J/K','W/K','N/K','J/s'], correctIndex: 0 },
        { text: 'Specific heat symbol', options: ['C','S','H','Q'], correctIndex: 0 },
      ],
      xpReward: 45,
      badgeReward: 'Thermo Starter',
    },

    // Medic - B-Pharma (12)
    {
      title: 'B-Pharma: Pharmaceutics Basics',
      description: 'Dosage forms and routes',
      group: 'Medic', subgroup: 'B-Pharma', difficulty: 'medium',
      questions: [
        { text: 'Oral dosage form', options: ['tablet','ointment','injection','suppository'], correctIndex: 0 },
        { text: 'Parenteral route is', options: ['oral','topical','injection','sublingual'], correctIndex: 2 },
        { text: 'Sustained release means', options: ['immediate','delayed','controlled','none'], correctIndex: 2 },
        { text: 'Bioavailability is', options: ['fraction absorbed','dose','potency','efficacy'], correctIndex: 0 },
        { text: 'Capsule shell made of', options: ['cellulose','gelatin','starch','lactose'], correctIndex: 1 },
        { text: 'Ointment is', options: ['semi-solid','liquid','solid','gas'], correctIndex: 0 },
        { text: 'Syrup contains', options: ['water','oil','sugar solution','alcohol'], correctIndex: 2 },
        { text: 'Suppository route', options: ['rectal','oral','nasal','otic'], correctIndex: 0 },
        { text: 'Sterility is critical for', options: ['ointments','tablets','injectables','capsules'], correctIndex: 2 },
        { text: 'Enteric coating resists', options: ['saliva','gastric fluid','air','light'], correctIndex: 1 },
        { text: 'Excipients are', options: ['active','inert','toxins','solvents'], correctIndex: 1 },
        { text: 'Sublingual is', options: ['under tongue','under skin','in vein','in muscle'], correctIndex: 0 },
      ],
      xpReward: 40,
      badgeReward: 'Pharma Starter',
    },

    // Medic - D-Pharma (12)
    {
      title: 'D-Pharma: Pharmacology Basics',
      description: 'Drug action and effects',
      group: 'Medic', subgroup: 'D-Pharma', difficulty: 'medium',
      questions: [
        { text: 'Agonist is', options: ['blocks receptor','activates receptor','destroys receptor','none'], correctIndex: 1 },
        { text: 'Antagonist is', options: ['activates','blocks','modulates','destroys'], correctIndex: 1 },
        { text: 'Therapeutic index is', options: ['ED50/LD50','LD50/ED50','ED50*LD50','sum'], correctIndex: 1 },
        { text: 'Half-life symbol', options: ['t1/2','H1/2','L1/2','T2'], correctIndex: 0 },
        { text: 'Adverse effect is', options: ['no effect','benefit','harmful effect','placebo'], correctIndex: 2 },
        { text: 'Placebo is', options: ['active','inactive','toxic','antidote'], correctIndex: 1 },
        { text: 'Bioequivalence compares', options: ['brands','colors','shapes','sizes'], correctIndex: 0 },
        { text: 'Dose-response curve is', options: ['Emax','Cmax','AUC','AUMC'], correctIndex: 0 },
        { text: 'LD50 means', options: ['lethal dose 50%','low dose 50%','long dose 50%','limit dose 50%'], correctIndex: 0 },
        { text: 'First-pass occurs in', options: ['liver','kidney','heart','lungs'], correctIndex: 0 },
        { text: 'Pharmacokinetics is', options: ['what drug does to body','what body does to drug','toxicity','therapy'], correctIndex: 1 },
        { text: 'Antidote reverses', options: ['toxicity','efficacy','placebo','none'], correctIndex: 0 },
      ],
      xpReward: 40,
      badgeReward: 'Pharmaco Starter',
    },

    // General - Logical Reasoning (12)
    {
      title: 'Aptitude: Logical Reasoning',
      description: 'Series and analogies',
      group: 'General', subgroup: 'Aptitude', difficulty: 'medium',
      questions: [
        { text: 'Find next: 2,4,8,16,?', options: ['24','30','32','34'], correctIndex: 2 },
        { text: 'Odd one out: Apple, Mango, Orange, Potato', options: ['Apple','Mango','Orange','Potato'], correctIndex: 3 },
        { text: 'Analogy: Hand : Glove :: Foot : ?', options: ['Shoe','Hat','Ring','Sock'], correctIndex: 0 },
        { text: 'Missing term: A, C, E, G, ?', options: ['H','I','J','K'], correctIndex: 1 },
        { text: 'If all cats are animals, some animals are cats is', options: ['True','False','Cannot say','None'], correctIndex: 0 },
        { text: 'Odd one out: Circle, Square, Triangle, Cube', options: ['Circle','Square','Triangle','Cube'], correctIndex: 3 },
        { text: 'Series: 1,1,2,3,5,8,?', options: ['12','13','14','15'], correctIndex: 1 },
        { text: 'Clock: 90 degrees at 3:15?', options: ['Yes','No','Maybe','Never'], correctIndex: 1 },
        { text: 'Arrange ascending: 7/8, 3/4, 2/3', options: ['2/3,3/4,7/8','3/4,2/3,7/8','7/8,3/4,2/3','2/3,7/8,3/4'], correctIndex: 0 },
        { text: 'Venn: Fruits & Apples', options: ['disjoint','overlap','subset','equal'], correctIndex: 2 },
        { text: 'Direction: Facing North, left turn is', options: ['East','West','South','North'], correctIndex: 1 },
        { text: 'Coding: If A=1, C=?', options: ['2','3','4','5'], correctIndex: 1 },
      ],
      xpReward: 35,
      badgeReward: 'Reasoning Starter',
    }
  ]);

  console.log('Seed complete');
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
