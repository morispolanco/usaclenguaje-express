
import { Module } from './types';

export const modulesData: Module[] = [
    {
        id: "module1",
        title: "Módulo 1: Comunicación",
        lessons: [
            {
                id: "lesson1-1",
                title: "Lección 1.1: Proceso de Comunicación",
                declarativeContent: "Definición del proceso de comunicación y sus elementos.",
                proceduralContent: "Definición de los elementos fundamentales de la comunicación y otros componentes (emisor, receptor, mensaje, código, canal, contexto, ruido) e identificación de estos elementos en distintos actos comunicativos.",
                exampleHtml: `<h4>Ejemplo:</h4><p>En una conversación entre dos amigos:</p><ul><li><strong>Emisor:</strong> La persona que habla</li><li><strong>Receptor:</strong> La persona que escucha</li><li><strong>Mensaje:</strong> El contenido de lo que se dice</li><li><strong>Código:</strong> El idioma español</li><li><strong>Canal:</strong> El aire (sonidos)</li><li><strong>Contexto:</strong> La situación en la que se desarrolla la conversación</li><li><strong>Ruido:</strong> Sonidos externos que pueden interferir en la comunicación</li></ul>`,
                quiz: {
                    questions: [
                        {
                            id: "q1-1",
                            question: "1. ¿Cuál de los siguientes NO es un elemento fundamental del proceso de comunicación?",
                            options: [
                                { id: "q1-1-a", text: "Emisor" },
                                { id: "q1-1-b", text: "Receptor" },
                                { id: "q1-1-c", text: "Entrevistador" }
                            ],
                            correctAnswerId: "q1-1-c"
                        },
                        {
                            id: "q1-2",
                            question: "2. En una llamada telefónica, ¿qué elemento representa la línea telefónica?",
                            options: [
                                { id: "q1-2-a", text: "Código" },
                                { id: "q1-2-b", text: "Canal" },
                                { id: "q1-2-c", text: "Contexto" }
                            ],
                            correctAnswerId: "q1-2-b"
                        },
                        {
                            id: "q1-3",
                            question: "3. ¿Qué elemento se refiere a las circunstancias que rodean el acto comunicativo?",
                            options: [
                                { id: "q1-3-a", text: "Mensaje" },
                                { id: "q1-3-b", text: "Código" },
                                { id: "q1-3-c", text: "Contexto" }
                            ],
                            correctAnswerId: "q1-3-c"
                        }
                    ]
                }
            },
            {
                id: "lesson1-2",
                title: "Lección 1.2: Funciones del Lenguaje",
                declarativeContent: "Definición de las funciones del lenguaje (informativa, emotiva, apelativa, poética, fática, metalingüística).",
                proceduralContent: "Identificación de las funciones del lenguaje en oraciones, párrafos y textos, y reconocimiento de las relaciones existentes entre los elementos de la comunicación y las funciones del lenguaje.",
                exampleHtml: `<h4>Ejemplo:</h4><ul><li><strong>Función informativa o referencial:</strong> "La Tierra gira alrededor del Sol." (Transmite información objetiva)</li><li><strong>Función emotiva o expresiva:</strong> "¡Estoy tan feliz hoy!" (Expresa sentimientos del emisor)</li><li><strong>Función apelativa o conativa:</strong> "Por favor, cierra la puerta." (Busca una reacción del receptor)</li><li><strong>Función poética o estética:</strong> "En el silencio solo se escucha el susurro del viento." (Preocupa la forma del mensaje)</li><li><strong>Función fática:</strong> "Hola, ¿me escuchas?" (Establece, mantiene o finaliza la comunicación)</li><li><strong>Función metalingüística:</strong> "La palabra 'casa' es un sustantivo." (Usa el lenguaje para hablar del lenguaje)</li></ul>`,
                quiz: {
                    questions: [
                        {
                            id: "q2-1",
                            question: "1. \"¡Te quiero mucho!\" ¿Qué función del lenguaje predomina en esta expresión?",
                            options: [
                                { id: "q2-1-a", text: "Función informativa" },
                                { id: "q2-1-b", text: "Función emotiva" },
                                { id: "q2-1-c", text: "Función apelativa" }
                            ],
                            correctAnswerId: "q2-1-b"
                        },
                        {
                            id: "q2-2",
                            question: "2. \"La palabra 'árbol' tiene un acento prosódico en la primera sílaba.\" ¿Qué función del lenguaje se utiliza?",
                            options: [
                                { id: "q2-2-a", text: "Función metalingüística" },
                                { id: "q2-2-b", text: "Función poética" },
                                { id: "q2-2-c", text: "Función fática" }
                            ],
                            correctAnswerId: "q2-2-a"
                        },
                        {
                            id: "q2-3",
                            question: "3. ¿Cuál función del lenguaje se centra en el receptor del mensaje?",
                            options: [
                                { id: "q2-3-a", text: "Función emotiva" },
                                { id: "q2-3-b", text: "Función apelativa" },
                                { id: "q2-3-c", text: "Función informativa" }
                            ],
                            correctAnswerId: "q2-3-b"
                        }
                    ]
                }
            },
             {
                id: "lesson1-3",
                title: "Lección 1.3: Argumentación",
                declarativeContent: "Definición de juicio, razonamiento y argumentación. Estructura y características del juicio, del razonamiento y de la argumentación. Elementos de la argumentación: apertura, desarrollo, cierre. Tipos de argumentación, según contenido, finalidad, capacidad persuasiva, función. Silogismos: definición, estructura, tipos y reglas. Falacias: definición, clasificación y principales tipos.",
                proceduralContent: "Distinción de la estructura y características del juicio, del razonamiento y de la argumentación. Identificación de los elementos de la argumentación. Diferenciación de los tipos de argumentación.",
                exampleHtml: `<h4>Ejemplo:</h4><p><strong>Estructura de la argumentación:</strong></p><ul><li><strong>Apertura:</strong> Presentación del tema y tesis. Ejemplo: "El uso de energías renovables es fundamental para el futuro del planeta."</li><li><strong>Desarrollo:</strong> Argumentos que respaldan la tesis. Ejemplo: "Las energías renovables no producen emisiones de CO2, son inagotables y cada vez más accesibles económicamente."</li><li><strong>Cierre:</strong> Conclusión que refuerza la tesis. Ejemplo: "Por lo tanto, es imperativo que los gobiernos y ciudadanos promuevan y adopten fuentes de energía renovable."</li></ul><p><strong>Silogismo:</strong></p><ul><li><strong>Premisa mayor:</strong> Todos los mamíferos tienen vértebras.</li><li><strong>Premisa menor:</strong> El perro es un mamífero.</li><li><strong>Conclusión:</strong> El perro tiene vértebras.</li></ul>`,
                quiz: {
                    questions: [
                        {
                            id: "q3-1",
                            question: "1. ¿Cuál de los siguientes NO es un elemento de la estructura de la argumentación?",
                            options: [
                                { id: "q3-1-a", text: "Apertura" },
                                { id: "q3-1-b", text: "Desarrollo" },
                                { id: "q3-1-c", text: "Introducción" }
                            ],
                            correctAnswerId: "q3-1-c"
                        },
                        {
                            id: "q3-2",
                            question: "2. En un silogismo, ¿cómo se denomina la conclusión que se deriva de las premisas?",
                            options: [
                                { id: "q3-2-a", text: "Premisa mayor" },
                                { id: "q3-2-b", text: "Premisa menor" },
                                { id: "q3-2-c", text: "Consecuencia lógica" }
                            ],
                            correctAnswerId: "q3-2-c"
                        },
                        {
                            id: "q3-3",
                            question: "3. ¿Qué es una falacia en el contexto de la argumentación?",
                            options: [
                                { id: "q3-3-a", text: "Un argumento sólido y convincente" },
                                { id: "q3-3-b", text: "Un razonamiento aparentemente válido pero lógicamente incorrecto" },
                                { id: "q3-3-c", text: "Una premisa verdadera indiscutible" }
                            ],
                            correctAnswerId: "q3-3-b"
                        }
                    ]
                }
            },
        ],
    },
    {
        id: "module2",
        title: "Módulo 2: Lenguaje",
        lessons: [
            // Lessons for module 2 would be parsed and added here
        ],
    },
    {
        id: "module3",
        title: "Módulo 3: Ortografía",
        lessons: [
            // Lessons for module 3
        ],
    },
    {
        id: "module4",
        title: "Módulo 4: Gramática y Vocabulario",
        lessons: [
            // Lessons for module 4
        ],
    },
    {
        id: "module5",
        title: "Módulo 5: Exposición Oral y Escrita",
        lessons: [
            // Lessons for module 5
        ],
    },
    {
        id: "module6",
        title: "Módulo 6: Comprensión Lectora",
        lessons: [
            // Lessons for module 6
        ],
    },
];
