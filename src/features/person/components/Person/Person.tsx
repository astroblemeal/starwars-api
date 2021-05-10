import { useState, useEffect, Children } from 'react'
import { PersonProps } from '@features/person/components/Person/interface'
import { withPerson } from './withPerson'

interface Iship {
  name: string
  model: string
}

const Person = ({ name, gender, height, starships }: PersonProps) => {
  const [ships, setShips] = useState<Iship[]>([])
  const [favShip, setFavShip] = useState()

  const fetchStarship = async url => {
    const res = await fetch(url)
    return res.json()
  }

  const handleChange = e => {
    setFavShip(e.currentTarget.value)
    console.log(favShip)
  }

  useEffect(() => {
    for (let i = 0; i < starships.length; i += 1) {
      ;(async () => {
        const res = await fetchStarship(starships[i])
        setShips(prev => [...prev, res])
      })()
    }
  }, [starships])

  return (
    <div className='p-3 mt-10 bg-gray-300 rounded-sm bg-opacity-25'>
      <p className='mb-3 text-xl'>{name}</p>
      <p className='text-sm'>Climate: {gender}</p>
      <p className='text-sm'>Terrain: {height}</p>

      {ships.length > 0 && !favShip && (
        <div>
          <h1 className='text-sm mt-3'>Select Primary Ship</h1>
          <select onChange={handleChange}>
            {Children.toArray(
              ships.map(ship => {
                return <option>{ship.name}</option>
              })
            )}
          </select>
        </div>
      )}
      {ships.length > 0 && favShip && (
        <div>
          <h1 className='text-sm mt-3'>Primary Ship</h1>
          <p mb-3 text-xl>
            {favShip}
          </p>
        </div>
      )}
    </div>
  )
}

export default withPerson(Person)
