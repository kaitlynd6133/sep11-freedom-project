import kaboom from "kaboom"


const DEF_COUNT = 80
const DEF_GRAVITY = 800
const DEF_AIR_DRAG = 0.9
const DEF_VELOCITY = [1000, 4000]
const DEF_ANGULAR_VELOCITY = [-200, 200]
const DEF_FADE = 0.3
const DEF_SPREAD = 60
const DEF_SPIN = [2, 8]
const DEF_SATURATION = 0.7
const DEF_LIGHTNESS = 0.6

kaboom()

function addConfetti(opt = {}) {
	const sample = (s) => typeof s === "function" ? s() : s
	for (let i = 0; i < (opt.count ?? DEF_COUNT); i++) {
		const p = add([
			pos(sample(opt.pos ?? vec2(0, 0))),
			choose([
				rect(rand(5, 20), rand(5, 20)),
				circle(rand(3, 10)),
			]),
			color(sample(opt.color ?? hsl2rgb(rand(0, 1), DEF_SATURATION, DEF_LIGHTNESS))),
			opacity(1),
			lifespan(4),
			scale(1),
			anchor("center"),
			rotate(rand(0, 360)),
		])
		const spin = rand(DEF_SPIN[0], DEF_SPIN[1])
		const gravity = opt.gravity ?? DEF_GRAVITY
		const airDrag = opt.airDrag ?? DEF_AIR_DRAG
		const heading = sample(opt.heading ?? 0) - 90
		const spread = opt.spread ?? DEF_SPREAD
		const head = heading + rand(-spread / 2, spread / 2)
		const fade = opt.fade ?? DEF_FADE
		const vel = sample(opt.velocity ?? rand(DEF_VELOCITY[0], DEF_VELOCITY[1]))
		let velX = Math.cos(deg2rad(head)) * vel
		let velY = Math.sin(deg2rad(head)) * vel
		const velA = sample(opt.angularVelocity ?? rand(DEF_ANGULAR_VELOCITY[0], DEF_ANGULAR_VELOCITY[1]))
		p.onUpdate(() => {
			velY += gravity * dt()
			p.pos.x += velX * dt()
			p.pos.y += velY * dt()
			p.angle += velA * dt()
			p.opacity -= fade * dt()
			velX *= airDrag
			velY *= airDrag
			p.scale.x = wave(-1, 1, time() * spin)
		})
	}
}

onKeyPress("space", () => addConfetti({ pos: mousePos() }))
onMousePress(() => addConfetti({ pos: mousePos() }))



// Adding game objects to screen

// Start a kaboom game

// Load a sprite asset from "sprites/bean.png", with the name "bean"
loadSprite("bean", "/sprites/bean.png")
loadSprite("ghosty", "/sprites/ghosty.png")

// A "Game Object" is the basic unit of entity in kaboom
// Game objects are composed from components
// Each component gives a game object certain capabilities

// add() assembles a game object from a list of components and add to game, returns the reference of the game object
const player = add([
	sprite("bean"),   // sprite() component makes it render as a sprite
	pos(120, 80),     // pos() component gives it position, also enables movement
	rotate(0),        // rotate() component gives it rotation
	anchor("center"), // anchor() component defines the pivot point (defaults to "topleft")
])

// .onUpdate() is a method on all game objects, it registers an event that runs every frame
player.onUpdate(() => {
	// .angle is a property provided by rotate() component, here we're incrementing the angle by 120 degrees per second, dt() is the time elapsed since last frame in seconds
	player.angle += 120 * dt()
})
const SPEED = 320

onKeyDown("left", () => {
    player.move(-SPEED, 0)
})

onKeyDown("right", () => {
    player.move(SPEED, 0)
})

onKeyDown("up", () => {
    player.move(0, -SPEED)
})

onKeyDown("down", () => {
    player.move(0, SPEED)
})
// Add multiple game objects
for (let i = 0; i < 3; i++) {

	// generate a random point on screen
	// width() and height() gives the game dimension
	const x = rand(0, width())
	const y = rand(0, height())

	add([
		sprite("ghosty"),
		pos(x, y),
	])

}
