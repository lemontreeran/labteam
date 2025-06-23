import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const topic = req.body.topic || "MOF-5 Crystallinity"
    const response = await axios.post("http://localhost:8000/api/orchestrate", {
        input: {
            research_topic: topic
        }
    })
    res.status(200).json(response.data)
}
