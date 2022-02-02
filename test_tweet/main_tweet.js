Vue.component('tweet-message', {
    props: {
        'tweet': Object
    },
    template:`
    <div class="tweetMsg">
        <p>
            {{ tweet.text}}
        </p>
        <div class="tweetDate">
            <i class="fas fa-calendar fa-sm fa-fw"></i>{{ tweet.date }}
        </div>
        <div class="tweet_remove" @click="$emit('remove-tweet', 'index')">
            <span class="remove">Delete this tweet <i class="fas fa-trash fa-sm fa-fw"></i></span>
        </div>
    </div>`
})

let app = new Vue({
    el: '#app',
    data: {
        userData: {},
        name: '',
        email: '',
        password: '',
        max_length: 25,
        max_pass_length: 16,
        error: "",
        registered: false,
        tweetMsg: '',
        max_tweet: 200,
        tweets: []

    },
    methods: {
        registerAccount(){
            if(this.name !== "" && this.email !== "" && this.password !== "") {
                // record the user data
                this.userData.name = this.name
                this.userData.email = this.email
                this.userData.password = this.password
            } else {
                this.error = "Complete all fields"
            }
            // add registration data to the localstorage
            localStorage.setItem('simple_tweet_registered', true)
            localStorage.setItem('simple_tweet_registered_user', JSON.stringify(this.userData))
            // clear the registration fields
            this.name = ''
            this.email = ''
            this.password = ''
        },
        sendTweet(){
            // Store the tweet in the tweets property
            this.tweets.unshift(
                {
                    text: this.tweetMsg,
                    date: new Date().toLocaleString()
                }
            )
            // Empty the text are via the tweetMsg
            this.tweetMsg = '';
            // Tranform the tweets to a JSON
            let stringTweets = JSON.stringify(this.tweets)
            // Store it in the local storage
            localStorage.setItem('simple_tweet_tweets', stringTweets)
        },
        removeTweet(index){
            let removeIt = confirm("Are you sure you want to remove this tweet?")
            if(removeIt) {
                this.tweets.splice(index, 1);
                // remove the tweet from the local storage
                localStorage.simple_tweet_tweets = JSON.stringify(this.tweets)
            }
        }
    }, 
    created() {
        /* Check if the user is registered and set registeed property to true */
        if(localStorage.getItem("simple_tweet_registered") === 'true') {
            this.registered = true;
        }
        if(localStorage.getItem('simple_tweet_registered_user')) {
            this.userData = JSON.parse(localStorage.getItem('simple_tweet_registered_user'))
        }

        if(localStorage.getItem("simple_tweet_tweets")){
            console.log("There is a list of tweets");
            this.tweets = JSON.parse(localStorage.getItem('simple_tweet_tweets'))
        } else {
            console.log("No tweets yet!");
        }

        /* repopulate the userData object */
    }
})