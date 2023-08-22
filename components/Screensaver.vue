<template>
  <div class="fullscreen d-flex flex-column justify-content-center align-items-center">
<!--    <div class="logoset">-->
<!--      <b-img src="/img/default/logo/p.svg" class="position-absolute p"></b-img>-->
<!--      <b-img src="/img/default/logo/e.svg" class="position-absolute e"></b-img>-->
<!--      <b-img src="/img/default/logo/s.svg" class="position-absolute s"></b-img>-->
<!--      <b-img src="/img/default/logo/m.svg" class="position-absolute m1"></b-img>-->
<!--      <b-img src="/img/default/logo/o.svg" class="position-absolute o"></b-img>-->
<!--      <b-img src="/img/default/logo/m.svg" class="position-absolute m2"></b-img>-->
<!--      <b-img src="/img/default/logo/a.svg" class="position-absolute a"></b-img>-->
<!--      <b-img src="/img/default/logo/t.svg" class="position-absolute t"></b-img>-->
<!--    </div>-->
    <div class="logoset notransition">
      <b-img src="/img/generate/logo/p.svg" class="position-absolute pgen"></b-img>
      <b-img src="/img/generate/logo/pgear.svg" class="position-absolute pgear"></b-img>
      <b-img src="/img/generate/logo/e.svg" class="position-absolute e"></b-img>
      <b-img src="/img/generate/logo/s.svg" class="position-absolute s"></b-img>
      <b-img src="/img/generate/logo/m.svg" class="position-absolute m1"></b-img>
      <b-img src="/img/generate/logo/o.svg" class="position-absolute o"></b-img>
      <b-img src="/img/generate/logo/m.svg" class="position-absolute m2"></b-img>
      <b-img src="/img/generate/logo/a.svg" class="position-absolute a"></b-img>
      <b-img src="/img/generate/logo/t.svg" class="position-absolute t"></b-img>
    </div>
    <div class="d-flex flex-row justify-content-around promo-text" id="actions">
      <div class="promo-item align-self-end">
        <b-img id="search" src="/img/default/search.svg"/>
        <div>{{ $t('promo.search') }}</div>
      </div>
      <div class="promo-item">
        <b-img id="generate" src="/img/default/generate.svg"/>
        <div>{{ $t('promo.generate') }}</div>
      </div>
      <div class="promo-item align-self-end">
        <b-img id="hand" src="/img/default/hand.svg"/>
        <div>{{ $t('promo.hand') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'screensaver',
}
</script>

<style scoped lang="scss">
@import "scss/custom";
$logo_scale: 3;
$scale: 2;

#actions {
  margin-top: 200px;
  width: 80vw;
  height: 340px;
}

.promo-text {
  color: map-get($default-colours, 'accent');
  text-align: center;
  font-size: 40px;
  font-family: MAGIONA_DISPLAY, serif;
}

.promo-item {
  width: 210px;
  max-width: 210px;
}
#search {
  width: calc(50px * $scale);
  height: calc(53px * $scale);
}
#generate {
  width: calc(52px * $scale);
  height: calc(53px * $scale);
}
#hand {
  width: calc(46px * $scale);
  height: calc(53px * $scale);
}


.notransition {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
}

.fullscreen {
  height: 100vh;
  width: 100vw;
  animation: colorshift 3s ease-in-out infinite;
}

.logoset {
  position: relative;
  width: calc(204px * $logo_scale);
  height: calc(84px * $logo_scale);
  font-size: calc(1rem * $logo_scale);
}

.p {
  width: calc(40px * $logo_scale);
  height: calc(54px * $logo_scale);
  top: 0;
  left: 0;
  animation: animate-p 10s ease-in-out infinite;
}

.pgen {
  width: calc(40px * $logo_scale);
  height: calc(54px * $logo_scale);
  top: calc(0px * $logo_scale);
  left: calc(-14px * $logo_scale);
  animation: animate-p 10s ease-in-out infinite;
}

.pgear {
  width: calc(40px * $logo_scale);
  height: calc(54px * $logo_scale);
  top: calc(-5px * $logo_scale);
  left: calc(1px * $logo_scale);
  animation: animate-p 10s ease-in-out infinite;
}

.e {
  width: calc(37px * $logo_scale);
  height: calc(38px * $logo_scale);
  top: calc(1px * $logo_scale);
  left: calc(42px * $logo_scale);
  animation: animate-e 10s ease-in-out infinite;
}

.s {
  width: calc(31px * $logo_scale);
  height: calc(39px * $logo_scale);
  top: 0;
  left: calc(75px * $logo_scale);
  animation: animate-s 10s ease-in-out infinite;
}

.m1 {
  width: calc(61px * $logo_scale);
  height: calc(38px * $logo_scale);
  top: 0;
  left: calc(106px * $logo_scale);
  animation: animate-m1 10s ease-in-out infinite;
}

.o {
  width: calc(36px * $logo_scale);
  height: calc(38px * $logo_scale);
  top: 0;
  left: calc(168px * $logo_scale);
  animation: animate-o 10s ease-in-out infinite;
}

.m2 {
  width: calc(61px * $logo_scale);
  height: calc(38px * $logo_scale);
  top: calc(46px * $logo_scale);
  left: calc(39px * $logo_scale);
  animation: animate-m2 10s ease-in-out infinite;
}

.a {
  width: calc(34px * $logo_scale);
  height: calc(35px * $logo_scale);
  top: calc(49px * $logo_scale);
  left: calc(101px * $logo_scale);
  animation: animate-a 10s ease-in-out infinite;
}

.t {
  width: calc(101px * $logo_scale);
  height: calc(53px * $logo_scale);
  top: calc(31px * $logo_scale);
  left: calc(100px * $logo_scale);
  animation: animate-t 10s ease-in-out infinite;
}

@keyframes colorshift {
  0%, 100% {
    background-color: map-get($animation, '1');
  }
  50% {
    background-color: map-get($animation, '2');
  }
}

@keyframes animate-p {
  0%, 100% {
    transform: rotate(0);
  }
  10% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(-100deg);
  }
}

@keyframes animate-e {
  0%, 100% {
    transform: rotate(0);
  }
  30% {
    transform: rotate(-340deg);
  }
  60% {
    transform: rotate(140deg);
  }
}

@keyframes animate-s {
  0%, 100% {
    transform: rotate(0);
  }
  10% {
    transform: rotate(-40deg);
  }
  30% {
    transform: rotate(-160deg);
  }
  60% {
    transform: rotate(140deg);
  }
}

@keyframes animate-m1 {
  0%, 100% {
    transform: rotate(0);
  }
  30% {
    transform: rotate(-150deg);
  }
  60% {
    transform: rotate(120deg);
  }
  90% {
    transform: rotate(30deg);
  }
}

@keyframes animate-o {
  0%, 100% {
    transform: rotate(0);
  }
  30% {
    transform: rotate(-60deg);
  }
  60% {
    transform: rotate(200deg);
  }
  90% {
    transform: rotate(30deg);
  }
}
@keyframes animate-m2 {
  0%, 100% {
    transform: rotate(0);
  }
  10% {
    transform: rotate(-40deg);
  }
  30% {
    transform: rotate(-360deg);
  }
  60% {
    transform: rotate(210deg);
  }
}
@keyframes animate-a {
  0%, 100% {
    transform: rotate(0);
  }
  30% {
    transform: rotate(90deg);
  }
  60% {
    transform: rotate(140deg);
  }
}
@keyframes animate-t {
  0%, 100% {
    transform: rotate(0);
  }
  30% {
    transform: rotate(130deg);
  }
  60% {
    transform: rotate(320deg);
  }
}

@keyframes modeshift {
  0%, 100% {
    fill: map-get($default-colours, 'text');
    background-color: map-get($animation, '1');
  }
  50% {
    fill: map-get($generate-colours, 'text');
    background-color: map-get($animation, '2');
  }
}
</style>
