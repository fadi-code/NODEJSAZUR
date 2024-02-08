
# Social Media Platform Project with Azure

This project was carried out as part of the Developing Solutions for Microsoft Azure course, utilizing Azure services. We developed a social media platform enabling content creation and management via APIs. Our platform primarily focuses on the backend aspect for social networks.



## Usage

https://apisurazurvfinal.azurewebsites.net/api-docs/#/

## Installation

To install the necessary dependencies, run the following command:

```

npm install 

npm run swagger-autogen

node index


```


## Platform Architecture

For constructing the architecture of our platform, we opted for Node.js due to its ease of use and workflow simplification. Node.js allows us to handle asynchronous events during numerous connections on the platform. Our application is thus built upon Node.js.

We utilize GitHub Actions for deployment to Microsoft Azure's App Service. Additionally, we employ a MongoDB database that communicates with the App Service and utilizes Microsoft's storage space.

## Platform Features

Our platform offers various functionalities, including:

- **User Authentication:** Users can browse content available on the platform, but only registered users can add content. Through the authentication system, users can register and log in.

- **Content Management:** Once logged in, users can add, modify, and delete content of various types such as text, audio, video, images, etc.

- **User Hierarchy:** A user hierarchy system has been implemented to grant different rights. Users are assigned different roles allowing them to delete other users, content, or media.


## Contact

If you have any questions, concerns, or feedback, feel free to reach out:

- **Name:**  Modeste KOUASSI
- **Email:** modeste.kouassi@supinfo.com

- **Name:**  Fadi DJELOUAH
- **Email:** djelouah.fadi@supinfo.com


- **Name:**  Hence MULUNDA
- **Email:** hence.mulunda@supinfo.com
