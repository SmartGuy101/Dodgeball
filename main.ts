namespace SpriteKind {
    export const Shield = SpriteKind.create()
    export const PowerUp = SpriteKind.create()
    export const Speed = SpriteKind.create()
    export const Slow = SpriteKind.create()
    export const TimeSlow = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Slow, function (sprite, otherSprite) {
    Slow = true
    SlowSprite.destroy(effects.disintegrate, 100)
    pause(5000)
    Slow = false
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Shield, function (sprite, otherSprite) {
    Shield = true
    ShieldSprite.destroy(effects.disintegrate, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.TimeSlow, function (sprite, otherSprite) {
    TimeSlow = true
    TimeSlowSprite.destroy(effects.disintegrate, 100)
    pause(5000)
    TimeSlow = false
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (Shield == !(true)) {
    	
    } else {
        otherSprite.destroy(effects.disintegrate, 100)
        timer.after(110, function () {
            Shield = false
        })
    }
})
let MyEnemy: Sprite = null
let Shield_Delay = 0
let Slow_Delay = 0
let TimeSlow_Delay = 0
let Enemies: Sprite[] = []
let TimeSlowSprite: Sprite = null
let ShieldSprite: Sprite = null
let SlowSprite: Sprite = null
let TimeSlow = false
let Slow = false
let Shield = false
let MyPlayer = sprites.create(assets.image`Player`, SpriteKind.Player)
Shield = false
Slow = false
TimeSlow = false
scene.setBackgroundColor(7)
controller.moveSprite(MyPlayer)
MyPlayer.setBounceOnWall(true)
info.setScore(0)
forever(function () {
    Enemies = sprites.allOfKind(SpriteKind.Enemy)
})
forever(function () {
    if (TimeSlow == true) {
        for (let value of Enemies) {
            if (!(value.vx == 50 / 2.5 || value.vx == -50 / 2.5)) {
                value.vx = value.vx / 2.5
                value.vy = value.vy / 2.5
            }
        }
    } else {
        for (let value of Enemies) {
            if (value.vx > 49 || value.vx < -49) {
                value.vx = value.vx / 2.5 * 2.5
                value.vy = value.vy / 2.5 * 2.5
            } else {
                value.vx = value.vx * 2.5
                value.vy = value.vy * 2.5
            }
        }
    }
})
forever(function () {
    if (TimeSlow == false) {
        TimeSlow_Delay = randint(8000, 16000)
        pause(TimeSlow_Delay)
        TimeSlowSprite = sprites.create(assets.image`TimeSlow`, SpriteKind.TimeSlow)
        TimeSlowSprite.startEffect(effects.ashes)
        TimeSlowSprite.setPosition(randint(16, 154), randint(16, 114))
        pause(TimeSlow_Delay)
        timer.after(TimeSlow_Delay - 2000, function () {
            TimeSlowSprite.destroy(effects.disintegrate, 100)
        })
        pause(TimeSlow_Delay)
    }
})
forever(function () {
    if (Slow == false) {
        Slow_Delay = randint(3000, 6000)
        pause(Slow_Delay)
        SlowSprite = sprites.create(assets.image`Slow Sprite`, SpriteKind.Slow)
        SlowSprite.startEffect(effects.ashes)
        SlowSprite.setPosition(randint(16, 154), randint(16, 114))
        pause(Slow_Delay)
        timer.after(Slow_Delay - 2000, function () {
            SlowSprite.destroy(effects.disintegrate, 100)
        })
        pause(Slow_Delay)
    }
})
forever(function () {
    if (Shield == false) {
        Shield_Delay = randint(5000, 10000)
        pause(Shield_Delay)
        ShieldSprite = sprites.create(assets.image`Shield`, SpriteKind.Shield)
        ShieldSprite.startEffect(effects.ashes)
        ShieldSprite.setPosition(randint(16, 154), randint(16, 114))
        pause(Shield_Delay)
        timer.after(Shield_Delay - 2000, function () {
            ShieldSprite.destroy(effects.disintegrate, 100)
        })
        pause(Shield_Delay)
    }
})
forever(function () {
    if (Slow == true) {
        controller.moveSprite(MyPlayer, 50, 50)
        MyPlayer.startEffect(effects.coolRadial, 50)
    } else {
        controller.moveSprite(MyPlayer, 100, 100)
        effects.clearParticles(MyPlayer)
    }
})
forever(function () {
    if (Shield == true) {
        MyPlayer.setImage(assets.image`Player-Shield`)
    } else {
        MyPlayer.setImage(assets.image`Player`)
    }
})
forever(function () {
    MyEnemy = sprites.create(assets.image`Water-Ball`, SpriteKind.Enemy)
    MyEnemy.startEffect(effects.ashes)
    MyEnemy.setPosition(randint(0, 160), randint(0, 120))
    MyEnemy.setVelocity(50, 50)
    MyEnemy.setBounceOnWall(true)
    info.changeScoreBy(1)
    pause(randint(2000, 5000))
})
