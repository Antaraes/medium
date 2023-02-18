import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: '7v0zj2tt',
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'production',
  token: 'skAzcayGOx3phlwO7svypjxVVFVvcE2OM5vyPHhUdC47MoxubqHqtY1ymXWJQe9G1FTDJ8qe40l7ZopZntECBfd1fZ3TypO7wUp0Aw3Lzrpoylje677ySxUdvGTpsWVS1TeZiVp6Zl5aVOtt2WrAroDDo63meDvcnPBglKMnFWTQuvsL4tV8',
})

export default async function createComment(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { _id, name, email, comment } = req.body
    const response = await client.create({
      _type: 'document',
      post: {
        _type: 'reference',
        _ref: _id
      },
      name,
      email,
      comment
    })
    console.log(response);
    
    return res.status(200).json({ message: 'Comment created successfully', response })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Could not create comment', error })
  }
}
