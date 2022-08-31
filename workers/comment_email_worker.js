const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');

queue.process('emails',function(job,done){
    // is not working for some reason
    // console.log(`emails worker is processing the job - ${job.data}`);
    console.log('emails worker is processing the job',job.data);


    commentsMailer.newComment(job.data);

    done();
})