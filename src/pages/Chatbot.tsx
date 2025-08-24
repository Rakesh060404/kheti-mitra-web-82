import { useState } from 'react';
import { MessageCircle, Send, Bot, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

type ChatMessage = {
    id: number;
    type: 'bot' | 'user';
    message: string;
    timestamp: Date;
};

const Chatbot = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            type: 'bot',
            message: "Hello! I'm your agricultural assistant. How can I help you today?",
            timestamp: new Date(),
        },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const quickQuestions = [
        'What is PMFBY scheme?',
        'How to claim crop insurance?',
        'Premium calculation for wheat',
        'Weather insurance benefits',
        'Insurance coverage details',
        'How to apply for a loan?',
        'Loan eligibility criteria',
        'Interest rates for agricultural loans',
        'List government schemes for farmers',
        'How to get subsidy for equipment?',
        'What is Kisan Credit Card (KCC)?',
        'How to check loan application status?',
        'Documents required for insurance claim',
        'How to update bank details for PM-KISAN?',
        'What is the process for crop damage assessment?',
        'How to get soil health card?',
        'Are there insurance schemes for livestock?',
        'How to avail irrigation subsidy?',
        'Can I get insurance for horticulture crops?',
        'What is the timeline for loan approval?',
    ];

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            type: 'user' as const,
            message: newMessage,
            timestamp: new Date(),
        };

        setMessages((prev) => {
            const updatedMessages = [...prev, userMessage];
            // Simulate bot response
            setTimeout(() => {
                const botResponse = {
                    id: updatedMessages.length + 1,
                    type: 'bot' as const,
                    message: generateBotResponse(newMessage),
                    timestamp: new Date(),
                };
                setMessages((prevBot) => [...prevBot, botResponse]);
            }, 1000);
            return updatedMessages;
        });

        setNewMessage('');
    };

    const generateBotResponse = (userMsg: string) => {
        const msg = userMsg.toLowerCase();

        // Insurance queries
        if (msg.includes('pmfby') || msg.includes('pradhan mantri')) {
            return 'PMFBY is a crop insurance scheme providing coverage against yield losses. Farmers pay only 2% premium for Kharif and 1.5% for Rabi crops. The government subsidizes the rest of the premium cost.';
        }
        if (msg.includes('claim')) {
            return 'To claim insurance: 1) Report crop loss within 72 hours to nearest agricultural office 2) Get crop cutting experiment done 3) Submit required documents 4) Claim will be processed within 2 months.';
        }
        if (msg.includes('premium')) {
            return 'Premium depends on crop type, area, and coverage amount. Use our premium calculator on the Insurance page for accurate estimates. Government subsidizes 75-95% of the total premium cost.';
        }
        if (msg.includes('weather insurance')) {
            return 'Weather insurance protects farmers against losses due to adverse weather conditions such as drought, flood, or hailstorm. It helps stabilize income and reduce risk.';
        }
        if (msg.includes('coverage')) {
            return 'Insurance coverage includes crop loss due to natural calamities, pests, and diseases. Check specific scheme details for coverage limits and exclusions.';
        }
        if (msg.includes('livestock')) {
            return 'Yes, there are insurance schemes for livestock such as cattle, buffalo, and poultry. Contact your local veterinary office or insurance provider for details.';
        }
        if (msg.includes('horticulture')) {
            return 'Insurance for horticulture crops is available under certain government schemes. Please check with your local agriculture office for eligibility and coverage.';
        }
        if (msg.includes('documents') && msg.includes('claim')) {
            return 'Documents required for insurance claim include crop loss report, land ownership proof, bank details, and identity proof.';
        }
        if (msg.includes('crop damage assessment')) {
            return 'Crop damage assessment is done by local agricultural officers through crop cutting experiments and field surveys. Timely reporting is crucial for claim processing.';
        }

        // Loan queries
        if (msg.includes('loan') && msg.includes('apply')) {
            return 'To apply for an agricultural loan, visit your nearest bank branch or use their online portal. You will need land documents, ID proof, and crop details.';
        }
        if (msg.includes('loan') && msg.includes('eligibility')) {
            return 'Eligibility for agricultural loans depends on land ownership, crop type, and repayment capacity. Most banks require you to be a registered farmer with valid documents.';
        }
        if (msg.includes('interest rate') || (msg.includes('loan') && msg.includes('interest'))) {
            return 'Interest rates for agricultural loans typically range from 4% to 9% per annum, depending on the scheme and bank. Some government schemes offer interest subsidies.';
        }
        if (msg.includes('loan application status')) {
            return 'You can check your loan application status by visiting the bank portal or contacting your branch with your application reference number.';
        }
        if (msg.includes('timeline') && msg.includes('loan')) {
            return 'Loan approval timelines vary by bank and scheme, but typically range from 7 to 15 working days after document submission.';
        }

        // Government schemes queries
        if (msg.includes('government scheme') || msg.includes('schemes for farmers')) {
            return 'Major government schemes for farmers include PMFBY (crop insurance), KCC (Kisan Credit Card), PM-KISAN (income support), and subsidy programs for equipment and irrigation.';
        }
        if (msg.includes('subsidy')) {
            return 'To get subsidy for agricultural equipment, apply through your local agriculture office or bank. Schemes like PM-KUSUM and state programs offer subsidies for solar pumps, tractors, and more.';
        }
        if (msg.includes('kisan credit card') || msg.includes('kcc')) {
            return 'Kisan Credit Card (KCC) provides farmers with timely access to credit for crop production and allied activities. Apply at your bank with land and identity documents.';
        }
        if (msg.includes('pm-kisan') && msg.includes('bank details')) {
            return 'To update bank details for PM-KISAN, visit the official PM-KISAN portal or contact your local agriculture office with your Aadhaar and new bank account information.';
        }
        if (msg.includes('soil health card')) {
            return 'You can get a soil health card by submitting a soil sample at your nearest agriculture office. The card provides recommendations for fertilizer and crop planning.';
        }
        if (msg.includes('irrigation subsidy')) {
            return 'Irrigation subsidies are available under schemes like PM-KUSUM and state programs. Contact your local agriculture office for application details and eligibility.';
        }

        return 'I can help you with crop insurance, loan queries, government schemes, premium calculations, claim processes, coverage details, KCC, PM-KISAN, subsidies, and more. Please ask me anything specific!';
    };

    const sendQuickQuestion = (question: string) => {
        setNewMessage(question);
        sendMessage();
    };

    return (
        <div className="min-h-screen gradient-earth py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Chatbot Assistant</h1>
                    <p className="text-xl text-muted-foreground">Ask questions about crop insurance, PMFBY, claims, and premiums</p>
                </div>

                <Card className="shadow-medium border-border h-[600px] flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-primary" />
                            Agriverse Supportive Assistant
                        </CardTitle>
                        <CardDescription>Ask questions about crop insurance, PMFBY, claims, and premiums</CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col">
                        {/* Chat Messages */}
                        <ScrollArea className="flex-1 mb-4 h-[350px]">
                            <div className="space-y-4 pr-4">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.type === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted text-foreground'
                                                }`}
                                        >
                                            <div className="flex items-start gap-2 mb-1">
                                                {msg.type === 'bot' ? <Bot className="w-4 h-4 mt-0.5 text-primary" /> : <User className="w-4 h-4 mt-0.5" />}
                                                <span className="text-sm">{msg.type === 'bot' ? 'Assistant' : 'You'}</span>
                                            </div>
                                            <p className="text-sm">{msg.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        {/* Quick Questions */}
                        <div className="mb-4">
                            <p className="text-sm font-medium text-muted-foreground mb-2">Quick Questions:</p>
                            <div className="flex flex-wrap gap-2">
                                {quickQuestions.map((question, index) => (
                                    <Button key={index} variant="outline" size="sm" onClick={() => sendQuickQuestion(question)} className="text-xs">
                                        {question}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="flex gap-2">
                            <Input
                                placeholder="Ask about insurance schemes, claims, premiums..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <Button onClick={sendMessage}>
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Chatbot;