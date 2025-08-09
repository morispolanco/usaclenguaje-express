
import React, { useState, useEffect, useCallback } from 'react';
import { Module, Lesson, Quiz as QuizType, QuizQuestion } from './types';
import { modulesData } from './constants';
import { LockIcon, CheckIcon, XMarkIcon, BookOpenIcon, ChevronDownIcon } from './components/icons';
import { loadStripe } from '@stripe/stripe-js';

// --- Helper Components (defined in the same file for simplicity) ---

const Header: React.FC = () => (
  <header className="bg-slate-800 text-white shadow-lg sticky top-0 z-30">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <BookOpenIcon className="w-8 h-8 text-sky-400" />
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Guía de Lenguaje - PCB 2025</h1>
          <p className="text-xs md:text-sm text-slate-300">Universidad de San Carlos de Guatemala</p>
        </div>
      </div>
    </div>
  </header>
);

interface TableOfContentsProps {
  modules: Module[];
  isPaid: boolean;
  onUnlockRequest: () => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ modules, isPaid, onUnlockRequest }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, isLocked: boolean) => {
    if (isLocked) {
      e.preventDefault();
      onUnlockRequest();
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-white">
      <h4 className="text-lg font-bold text-slate-700 border-b pb-2 mb-3">Contenido</h4>
      <ul className="space-y-2">
        {modules.map((module, index) => {
          const isLocked = index > 0 && !isPaid;
          return (
            <li key={module.id}>
              <a
                href={`#${module.id}`}
                onClick={(e) => handleLinkClick(e, isLocked)}
                className={`flex items-center justify-between text-sky-700 hover:text-sky-500 hover:underline transition-colors duration-200 ${isLocked ? 'text-slate-400 hover:text-slate-500 cursor-pointer' : ''}`}
              >
                <span>{module.title}</span>
                {isLocked && <LockIcon className="w-4 h-4 text-slate-400" />}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

interface QuizProps {
  quiz: QuizType;
}

const Quiz: React.FC<QuizProps> = ({ quiz }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [results, setResults] = useState<{ [key: string]: boolean } | null>(null);

  const handleOptionChange = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    setResults(null); // Reset results when a new answer is selected
  };

  const checkAnswers = () => {
    const newResults: { [key: string]: boolean } = {};
    quiz.questions.forEach(q => {
      newResults[q.id] = answers[q.id] === q.correctAnswerId;
    });
    setResults(newResults);
  };
  
  const getResultIcon = (question: QuizQuestion) => {
      if (!results || results[question.id] === undefined) return null;
      const isCorrect = results[question.id];
      return isCorrect ? <CheckIcon className="w-5 h-5 text-green-600" /> : <XMarkIcon className="w-5 h-5 text-red-600" />;
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg my-4">
      <h4 className="text-lg font-bold text-slate-700 mb-4">Quiz</h4>
      <div className="space-y-6">
        {quiz.questions.map((q) => (
          <div key={q.id}>
             <div className="flex items-start justify-between">
                <p className="font-semibold text-slate-800 mb-2">{q.question}</p>
                {results && getResultIcon(q)}
            </div>
            <div className="space-y-2 pl-4">
              {q.options.map((opt) => (
                <label key={opt.id} className={`block p-3 rounded-md transition-all duration-200 cursor-pointer ${
                    answers[q.id] === opt.id ? 'bg-sky-100 ring-2 ring-sky-300' : 'bg-white hover:bg-slate-100'
                  } ${
                    results && q.correctAnswerId === opt.id ? 'bg-green-100 border-l-4 border-green-500' : ''
                  } ${
                    results && answers[q.id] === opt.id && q.correctAnswerId !== opt.id ? 'bg-red-100 border-l-4 border-red-500' : ''
                  }`}>
                  <input
                    type="radio"
                    name={q.id}
                    value={opt.id}
                    checked={answers[q.id] === opt.id}
                    onChange={() => handleOptionChange(q.id, opt.id)}
                    className="mr-3"
                  />
                  <span className={results && q.correctAnswerId === opt.id ? 'font-bold text-green-800' : 'text-slate-700'}>
                    {opt.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={checkAnswers}
        className="mt-6 w-full bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
      >
        Verificar respuestas
      </button>
    </div>
  );
};


interface LessonProps {
  lesson: Lesson;
}

const LessonComponent: React.FC<LessonProps> = ({ lesson }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="bg-sky-50 border-l-4 border-sky-500 p-6 rounded-r-lg my-6 shadow-sm">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
              <h3 className="text-xl font-bold text-sky-800">{lesson.title}</h3>
              <ChevronDownIcon className={`w-6 h-6 text-sky-700 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}/>
            </button>
            
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-none mt-4' : 'max-h-0'}`}>
                <div className="prose max-w-none prose-slate">
                  <p><strong>Contenido Declarativo:</strong> {lesson.declarativeContent}</p>
                  <p><strong>Contenido Procedimental:</strong> {lesson.proceduralContent}</p>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg my-4" dangerouslySetInnerHTML={{ __html: lesson.exampleHtml }} />
                </div>
                {lesson.quiz && lesson.quiz.questions.length > 0 && <Quiz quiz={lesson.quiz} />}
            </div>
        </div>
    )
}

interface ModuleContainerProps {
  module: Module;
  isLocked: boolean;
  onUnlockRequest: () => void;
}

const ModuleContainer: React.FC<ModuleContainerProps> = ({ module, isLocked, onUnlockRequest }) => {
  if (isLocked) {
    return (
      <div id={module.id} className="scroll-mt-20 p-6 rounded-lg bg-slate-100 border border-slate-300 my-8 relative text-center">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full p-8">
            <LockIcon className="w-16 h-16 text-slate-400 mb-4" />
            <h2 className="text-3xl font-bold text-slate-600">{module.title}</h2>
            <p className="text-slate-500 mt-2">Este módulo está bloqueado.</p>
            <button
              onClick={onUnlockRequest}
              className="mt-6 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Desbloquear Todos los Módulos
            </button>
        </div>
      </div>
    );
  }

  return (
    <div id={module.id} className="my-8 scroll-mt-20">
      <div className="p-6 rounded-t-lg bg-slate-700 text-white">
          <h2 className="text-3xl font-extrabold tracking-tight">{module.title}</h2>
      </div>
      <div className="bg-white p-2 md:p-6 rounded-b-lg shadow-lg">
        {module.lessons.map((lesson) => (
          <LessonComponent key={lesson.id} lesson={lesson} />
        ))}
         {module.lessons.length === 0 && <p className="text-slate-500 p-4">Contenido próximamente...</p>}
      </div>
    </div>
  );
};

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay: () => Promise<void>;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPay }) => {
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;

  const handlePayClick = async () => {
    setIsLoading(true);
    try {
      await onPay();
    } catch (error) {
      console.error("Failed to initiate payment:", error);
      setIsLoading(false); // Reset loading on error
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all duration-300 scale-100">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Desbloquear Guía Completa</h2>
        <p className="text-slate-600 mb-6">Obtén acceso instantáneo a todos los módulos y quizzes para prepararte al máximo.</p>
        <div className="bg-sky-50 border border-sky-200 rounded-lg p-6 my-4">
          <p className="text-5xl font-extrabold text-sky-600">$9.00</p>
          <p className="text-slate-500 font-medium">Pago único de por vida</p>
        </div>
        <button
          onClick={handlePayClick}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-75 disabled:cursor-wait"
        >
          {isLoading ? 'Redirigiendo a pago...' : 'Pagar y Desbloquear Ahora'}
        </button>
        <button
          onClick={onClose}
          className="mt-4 text-slate-500 hover:text-slate-700 transition-colors"
        >
          Quizás más tarde
        </button>
      </div>
    </div>
  );
};


// --- Main App Component ---

function App() {
  const [isPaid, setIsPaid] = useState(() => {
    return JSON.parse(localStorage.getItem('isGuidePaid') || 'false');
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('payment') === 'success') {
      setIsPaid(true);
      localStorage.setItem('isGuidePaid', 'true');
      window.history.replaceState(null, '', window.location.pathname);
    }
    if (query.get('payment') === 'cancel') {
       window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handleUnlockRequest = useCallback(() => {
    setShowPaymentModal(true);
  }, []);

  const handlePayment = async () => {
    // For real payments, this key MUST be your LIVE Stripe publishable key.
    // It should be loaded from a secure environment variable, not hardcoded.
    // Example: process.env.STRIPE_PUBLISHABLE_KEY
    const stripePublicKey = process.env.STRIPE_PUBLISHABLE_KEY;

    if (!stripePublicKey) {
      const errorMessage = "Stripe publishable key is not configured. Please set the STRIPE_PUBLISHABLE_KEY environment variable.";
      console.error(errorMessage);
      alert('Error de configuración de pago. Por favor, contacte al soporte.');
      throw new Error(errorMessage);
    }

    const stripePromise = loadStripe(stripePublicKey);
    const stripe = await stripePromise;

    if (!stripe) {
        console.error("Stripe.js has not loaded yet.");
        throw new Error("Stripe.js failed to load.");
    }
    
    // IMPORTANT: For real payments, you must create a Product and a Price
    // in your Stripe Dashboard (live mode) and use its ID here.
    const priceId = 'prod_Spm6cnxBN88zww'; // <-- REPLACE WITH YOUR LIVE PRICE ID FROM STRIPE

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'payment',
      successUrl: `${window.location.origin}${window.location.pathname}?payment=success`,
      cancelUrl: `${window.location.origin}${window.location.pathname}?payment=cancel`,
    });

    if (error) {
      console.error("Stripe checkout error:", error);
      throw error;
    }
  };
  
  useEffect(() => {
    // This is to adjust scroll position for anchor links to account for the sticky header
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 80; // approximate height of the sticky header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    };
    
    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange, true);
    
    // Initial check in case the page loads with a hash
    if(window.location.hash) {
        setTimeout(handleHashChange, 100);
    }
    
    // Cleanup
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);


  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:space-x-8 py-8">
          <aside className="w-full md:w-1/4 lg:w-1/5 md:sticky md:top-20 self-start mb-8 md:mb-0">
            <TableOfContents modules={modulesData} isPaid={isPaid} onUnlockRequest={handleUnlockRequest} />
          </aside>
          <main className="w-full md:w-3/4 lg:w-4/5">
            {modulesData.map((module, index) => (
              <ModuleContainer
                key={module.id}
                module={module}
                isLocked={index > 0 && !isPaid}
                onUnlockRequest={handleUnlockRequest}
              />
            ))}
          </main>
        </div>
      </div>
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPay={handlePayment}
      />
    </div>
  );
}

export default App;
