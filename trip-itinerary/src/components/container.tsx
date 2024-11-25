import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const Container = () => {
   const [location, setLocation] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [loading, setLoading] = useState(false);
   const [response, setResponse] = useState("");
   const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
   const prompt = `Trip Itinerary Request
   Location: ${location}
   Start Date: ${startDate}
   End Date: ${endDate}
   Please create a comprehensive day-to-day itinerary that includes:
   Daily Schedule: A clear breakdown of activities for each day, including specific times for sightseeing, meals, and leisure.
   Dining Recommendations: Suggested restaurants or local eateries for each meal.
   Transportation Details: Best options for getting around, including any necessary travel times.
   Accommodation Suggestions: Recommended places to stay for various budgets.
   Local Insights: Tips or must-see attractions that enhance the travel experience.
   Ensure the itinerary is well-structured and easy to follow, capturing both popular destinations and hidden gems. Feel free to fill in the placeholders with your specific trip details for a tailored response!`;

   const getResponseForGivenPrompt = async () => {
      try {
         setLoading(true);
         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
         const result = await model.generateContent(prompt);
         const response = await result.response;
         const text = await response.text();

         setResponse(text);
      } catch (error) {
         console.log("Something Went Wrong");
         setResponse("Failed to generate trip itinerary");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div
         style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
         }}
      >
         <div
            style={{
               width: "30vw",
               display: "flex",
               flexDirection: "column",
               gap: "10px",
            }}
         >
            <input
               style={{
                  borderRadius: "4px",
                  padding: "10px 20px",
               }}
               type="text"
               placeholder="Enter location"
               value={location}
               onChange={(e) => setLocation(e.target.value)}
            />
            <input
               style={{
                  borderRadius: "4px",
                  padding: "10px 20px",
               }}
               type="date"
               placeholder="Start date"
               value={startDate}
               onChange={(e) => setStartDate(e.target.value)}
            />
            <input
               style={{
                  borderRadius: "4px",
                  padding: "10px 20px",
               }}
               type="date"
               placeholder="End date"
               value={endDate}
               onChange={(e) => setEndDate(e.target.value)}
            />
            <button onClick={getResponseForGivenPrompt}>Get Itinerary</button>
         </div>
         {loading ? <div>loading..</div> : <div>{response}</div>}
      </div>
   );
};

export default Container;
