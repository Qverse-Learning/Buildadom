<template>
  <div class="row">
    <div class="col-md-1"></div>
    <div class="col-md-10">
      <div class="container">
      <div class="content">
        <div class="left-side">
          <div class="address details">
            <i class="fas fa-map-marker-alt"></i>
            <div class="topic">Address</div>
            <div class="text-one">Surkhet, NP12</div>
            <div class="text-two">Birendranagar 06</div>
          </div>
          <div class="phone details">
            <i class="fas fa-phone-alt"></i>
            <div class="topic">Phone</div>
            <div class="text-one">+0098 9893 5647</div>
            <div class="text-two">+0096 3434 5678</div>
          </div>
          <div class="email details">
            <i class="fas fa-envelope"></i>
            <div class="topic">Email</div>
            <div class="text-one">codinglab@gmail.com</div>
            <div class="text-two">info.codinglab@gmail.com</div>
          </div>
        </div>
        <div class="right-side">
          <div class="topic-text">Send us a message</div>
          <p>If you have any types of queries related to Buildadom, you can send me message from here. It's my pleasure to help you.</p>
          <form action="#">
            <div class="input-box">
              <input type="text" placeholder="Enter your name" />
            </div>
            <div class="input-box">
              <input type="text" placeholder="Enter your email" />
            </div>
            <div class="input-box message-box">
              <textarea placeholder="Enter your message"></textarea>
            </div>
            <div class="button">
              <input type="button" value="Send Now" />
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    <div class="col-md-1"></div>
  </div>
    <!-- Google Map -->
    <div class="w-full mt-6">
        <iframe class="w-full h-64 rounded-lg shadow-lg" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.570475446311!2d7.484535910244864!3d6.449150523996604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1044a3ce0685e91f%3A0x36e27332573be21d!2sCoal%20City%20Garden%2C%2056%20Coal%20City%20Garden%20Estate%2C%20Estate%2C%20Enugu%20400102%2C%20Enugu!5e0!3m2!1sen!2sng!4v1741275090065!5m2!1sen!2sng" width="600" height="900" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <FooterCompVue />
</template>

<script setup>
import FooterCompVue from "src/components/FooterComp.vue";
</script>

<style lang="scss" scoped>
/* Google Font CDN Link */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.w-full {
    width: 100%;
}

.mt-6 {
    margin-top: 1.5rem; /* Equivalent to mt-6 in Tailwind (24px) */
}

iframe {
    width: 100%;
    height: 32rem; /* Equivalent to h-64 in Tailwind (256px) */
    border-radius: 0.5rem; /* Equivalent to rounded-lg */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Equivalent to shadow-lg */
    border: none;
}


.row {
    margin: 0px 0;
    width:100%;
}

.col-md-1 {
    padding: 20px;
}

.col-md-10 {
    padding: 20px;
    text-align: center;
}


.container {
  width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 20px 60px 30px 40px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.container .content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container .content .left-side {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  position: relative;
}
.content .left-side::before {
  content: "";
  position: absolute;
  height: 70%;
  width: 2px;
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
  background: #afafb6;
}
.content .left-side .details {
  margin: 14px;
  text-align: center;
}
.content .left-side .details i {
  font-size: 30px;
  color: #246DFD;
  margin-bottom: 10px;
}
.content .left-side .details .topic {
  font-size: 18px;
  font-weight: 500;
}
.content .left-side .details .text-one,
.content .left-side .details .text-two {
  font-size: 14px;
  color: #afafb6;
}

.container .content .right-side {
  width: 75%;
  margin-left: 75px;
}
.content .right-side .topic-text {
  font-size: 23px;
  font-weight: 600;
  color: #246DFD;
}
.right-side .input-box {
  height: 55px;
  width: 100%;
  margin: 12px 0;
}
.right-side .input-box input,
.right-side .input-box textarea {
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  background: #f0f1f8;
  border-radius: 6px;
  padding: 0 15px;
  resize: none;
}
.right-side .message-box {
  min-height: 110px;
}
.right-side .input-box textarea {
  padding-top: 6px;
}
.right-side .button {
  display: inline-block;
  margin-top: 12px;
}
.right-side .button input[type="button"] {
  color: #fff;
  font-size: 18px;
  outline: none;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  background: #246DFD;
  cursor: pointer;
  transition: all 0.3s ease;
}
.button input[type="button"]:hover {
  background: #5029bc;
}

@media (max-width: 950px) {
  .container {
    width: 100%;
    padding: 30px 40px 40px 35px;
  }
  .container .content .right-side {
    width: 75%;
    margin-left: 55px;
  }
}
@media (max-width: 820px) {
  .container {
    margin: 40px 0;
    height: 100%;
  }
  .container .content {
    flex-direction: column-reverse;
  }
  .container .content .left-side {
    width: 100%;
    flex-direction: row;
    margin-top: 40px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .container .content .left-side::before {
    display: none;
  }
  .container .content .right-side {
    width: 100%;
    margin-left: 0;
  }
}

/* /// */

</style>
