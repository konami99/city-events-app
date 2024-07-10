import { createClient } from "@sanity/client";
import { sanityClientConfig } from "@/components/SanityClientConfig";

export async function POST(request: Request) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const eventId = params.get('event_id') as string;
    const formData = await request.formData();

    const file = formData.get("file");
    if (!file) {
        return Response.json({ error: "No files received." }, { status: 400 });
    }
    var filename = '';
    if (typeof file !== 'string') {
        const sanityClient = createClient(sanityClientConfig);
        await sanityClient.assets
            .upload('image', file)
            .then(imageAsset => {
                return sanityClient
                  .patch(eventId)
                  .set({
                    mainImage: {
                      _type: 'image',
                      asset: {
                        _type: "reference",
                        _ref: imageAsset._id
                      }
                    }
                  })
                  .commit()
              })
              .then(() => {
                console.log("Done!");
              })
    }
    return Response.json({ filename }, { status: 200 });
}
    